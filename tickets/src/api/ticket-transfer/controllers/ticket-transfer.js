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

    console.log()

    return 200
  }
}));
