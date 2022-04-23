'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    let user = ctx.state.user;
    let cart = ctx.request.body.cart;
    let paymentIntentId = ctx.request.body.paymentIntentId
    // Find Available Tickets
    let tickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: {
        eventId: cart.ticket.attributes.eventId,
        on_sale_status: "available"
      },
      limit: cart.ticketCount
    })
    // Not enough tickets available
    if (tickets.length !== cart.limit) return 400

    let ids = tickets.map(ticket => ticket.id)
    // Updates statuses
    let cartTickets = await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: ids
      },
      data: {
        on_sale_status: "inCart"
      }
    })
    // Creates Order with details
    let totalTicketPrices = Number(parseFloat(cart.ticket.attributes.cost * cart.ticketCount).toFixed(2))
    let fees = Number(parseFloat((cart.ticket.attributes.fee * cart.ticketCount) + (cart.ticket.attributes.facilityFee * cart.ticketCount) + 4.35 + 2.50).toFixed(2))
    let total = (totalTicketPrices + fees)

    let order = await strapi.db.query('api::order.order').create({
      data: {
        event: cart.ticket.attributes.eventId,
        users_permissions_user: user,
        userId: user.id,
        tickets,
        paymentProcessor: 'stripe',
        status: 'open',
        processedAt: new Date(),
        total,
        details: cart,
        paymentIntentId
      },
    });

    order = await strapi.db.query('api::order.order').findOne({
      where: { id: order.id },
      populate: { 
        tickets: true,
        event: {
          populate: {
            image: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      },
    });

    return order
  },
  async finalize(ctx) {
    let data = ctx.request.body;
    let type = data.type;
    if (!type) return
    let orderId;
    let order;
    let ticketIds;
    // Handle the event
    switch (type) {
      case 'payment_intent.succeeded':
        console.log('succeeded')
        orderId = data.data.object.metadata.order_id;

        order = await strapi.db.query('api::order.order').findOne({
          where: { id: orderId },
          populate: { tickets: true },
        });

        ticketIds = order.tickets.map((ticket) => ticket.id)
        await strapi.db.query('api::ticket.ticket').updateMany({
          where: {
            id: ticketIds,
          },
          data: {
            on_sale_status: 'sold',
          },
        });

        await strapi.db.query('api::order.order').update({
          where: { id: orderId },
          data: {
            status: 'complete'
          }
        });
      break;
      case 'payment_intent.payment_failed':
        console.log('failed')
        orderId = data.data.object.metadata.order_id;

        order = await strapi.db.query('api::order.order').findOne({
          where: { id: orderId },
          populate: { tickets: true },
        });

        ticketIds = order.tickets.map((ticket) => ticket.id)
        await strapi.db.query('api::ticket.ticket').updateMany({
          where: {
            id: ticketIds,
          },
          data: {
            on_sale_status: 'available',
          },
        });

        await strapi.db.query('api::order.order').update({
          where: { id: orderId },
          data: {
            status: 'failed'
          }
        });
      break;
    }
    return 200
  }
}));
