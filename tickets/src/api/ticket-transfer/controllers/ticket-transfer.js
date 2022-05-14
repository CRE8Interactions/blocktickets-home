'use strict';

/**
 *  ticket-transfer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket-transfer.ticket-transfer', ({ strapi}) => ({
  async create(ctx) {
    const { phoneNumber, orderId, ticketIds } = ctx.request.body;
    const user = ctx.state.user;

    let order = await strapi.entityService.findOne('api::order.order', orderId, {
      populate: { 
        event: {
          image: true,
          venue: {
            address: true
          }
        },
        tickets: {
          filters: {
            id: ticketIds
          }
        } 
      },
    });

    const entry = await strapi.entityService.create('api::ticket-transfer.ticket-transfer', {
      data: {
        fromUserId: user.id,
        fromUser: user,
        tickets: order.tickets,
        orderId: order.id,
        order: order.id,
        phoneNumberToUser: phoneNumber,
        ticketIds: order.tickets.map(ticket => ticket.id),
        status: 'pending',
        event: order.event
      },
    });

    await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: order.tickets.map(ticket => ticket.id),
      },
      data: {
        on_sale_status: 'pendingTransfer',
      },
    });

    return 200
  },
  async find(ctx) {
    const user = ctx.state.user;

    const entry = await strapi.entityService.findMany('api::ticket-transfer.ticket-transfer', {
      filters: {
        fromUserId: user.id
      },
      populate: {
        tickets: true,
        event: {
          populate: {
            image: true,
            venue: {
              address: true
            }
          }
        }
      }
    })

    return entry
  },
  async cancelTransfer(ctx) {
    const user = ctx.state.user;
    const { transferId } = ctx.request.body.data;

    const entry = await strapi.entityService.findOne('api::ticket-transfer.ticket-transfer', transferId, {
      populate: { tickets: true },
    });

    let ticketIds = entry.ticketIds;

    await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: ticketIds,
      },
      data: {
        on_sale_status: 'available',
      },
    });

    await strapi.entityService.update('api::ticket-transfer.ticket-transfer', transferId, {
      data: {
        status: 'canceled',
      },
    });

    return 200
  },
  async incoming(ctx) {
    const user = ctx.state.user;

    const entry = await await strapi.db.query('api::ticket-transfer.ticket-transfer').findMany({
      where: {
        phoneNumberToUser: user.phoneNumber,
        status: 'pending'
      },
      populate: {
        order: true,
        event: {
          populate: {
            image: true,
            venue: true
          }
        },
        tickets: true
      }
    })

    return entry
  },
  async accept(ctx) {
    const user = ctx.state.user;
    const { transferId } = ctx.request.body;

    const entry = await strapi.db.query('api::ticket-transfer.ticket-transfer').update({
      where: { id: transferId },
      data: {
        status: 'claimed',
        toUser: user,
        toUserId: user.id,
        transferedOn: new Date(),
        emailAddressToUser: user.email,
        complete: true
      },
      populate: {
        tickets: true,
        order: true,
        event: true
      }
    })

    let ticketIds = entry.ticketIds;
    let order = entry.order;
    let event = entry.event;

    let tickets = await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: ticketIds
      },
      data: {
        on_sale_status: "sold",
        transferredOn: new Date(),
        transferred: true
      }
    })

    tickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: {
        id: ticketIds
      }
    })

    await strapi.db.query('api::order.order').create({
      data: {
        event: event.id,
        users_permissions_user: user,
        userId: user.id,
        tickets,
        paymentProcessor: 'transfer',
        status: 'completeFromTransfer',
        processedAt: new Date(),
        total: 0,
        details: order,
      },
    });

    let originalOrder = await strapi.db.query('api::order.order').findOne({
      where: {
        id: order.id
      },
      populate: {
        tickets: true
      }
    })

    await strapi.db.query('api::order.order').update({
      where: { id: order.id },
      data: {
        tickets: originalOrder.tickets.filter((ticket) => !ticketIds.includes(ticket.id))
      }
    })

    return 200
  }
}));
