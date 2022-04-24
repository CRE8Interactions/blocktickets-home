'use strict';

/**
 *  ticket-transfer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket-transfer.ticket-transfer', ({ strapi}) => ({
  async create(ctx) {
    const { phoneNumber, orderId, ticketId } = ctx.request.body;
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
            id: { $eq: ticketId }
          }
        } 
      },
    });

    const entry = await strapi.entityService.create('api::ticket-transfer.ticket-transfer', {
      data: {
        fromUserId: (user.id),
        fromUser: user,
        tickets: order.tickets,
        orderId: order.id,
        order: order.id,
        phoneNumberToUser: phoneNumber,
        ticketIds: {ticketId},
        status: 'pending',
        event: order.event
      },
    });

    const ticket = await strapi.entityService.update('api::ticket.ticket', ticketId, {
      data: {
        on_sale_status: 'pendingTransfer',
      },
    });

    return 200
  }
}));
