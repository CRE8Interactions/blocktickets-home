'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    let user = ctx.state.user;
    let cart = ctx.request.body.cart;
    let paymentIntentId = ctx.request.body.paymentIntentId;
    let tickets;
    let totalTicketPrices;
    let fees;
    let total;
    let eventId;

    // Find Available Tickets
    if (cart.ticket) {
      totalTicketPrices = Number(parseFloat(cart.ticket.resale ? cart.ticket.listingAskingPrice : cart.ticket.cost * cart.ticketCount).toFixed(2))
      fees = Number(parseFloat((cart.ticket.fee * cart.ticketCount) + (cart.ticket.facilityFee * cart.ticketCount) + 4.35 + 2.50).toFixed(2))
      total = (totalTicketPrices + fees)
      eventId = cart.ticket.eventId

      tickets = await strapi.db.query('api::ticket.ticket').findMany({
        where: {
          eventId: cart.ticket.eventId,
          on_sale_status: "available"
        },
        limit: cart.ticketCount
      })
    } else if (cart.listing) {
      totalTicketPrices = Number(parseFloat(cart.listing.askingPrice).toFixed(2))
      fees = Number(parseFloat((cart.listing.tickets[0].fee * cart.listing.tickets.length) + (cart.listing.tickets[0].facilityFee * cart.listing.tickets.length) + 4.35 + 2.50).toFixed(2))
      total = (totalTicketPrices + fees)
      eventId = cart.listing.event.id

      tickets = await strapi.db.query('api::ticket.ticket').findMany({
        where: {
          eventId: eventId,
          id: { $eq: cart.listing.tickets.map(ticket => ticket.id) }
        }
      })
    }
    
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
    

    let order = await strapi.db.query('api::order.order').create({
      data: {
        event: eventId,
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
    let paymentIntentId;
    let order;
    let ticketIds;
    // Handle the event
    switch (type) {
      case 'payment_intent.succeeded':
        paymentIntentId = data.data.object.id;

        order = await strapi.db.query('api::order.order').findOne({
          where: { paymentIntentId },
          populate: { 
            tickets: true,
            event: {
              populate: {
                venue: {
                  populate: {
                    address: true
                  }
                }
              }
            }
          },
        });

        let ticketIds = order.tickets.map((ticket) => ticket.id)

        await strapi.db.query('api::ticket.ticket').updateMany({
          where: {
            id: ticketIds,
          },
          data: {
            on_sale_status: 'sold',
          },
        });

        await strapi.db.query('api::order.order').update({
          where: { paymentIntentId },
          data: {
            status: 'complete'
          }
        });
        
        if (!order.details.listing) return

        let listing = await strapi.db.query('api::listing.listing').update({
          where: { id: order.details.listing.id },
          data: {
            status: 'complete'
          }
        });

        // let fromOrder = await strapi.db.query('api::order.order').findOne({
        //   where: { id: listing.fromOrder },
        //   populate: { 
        //     tickets: true
        //   }
        // });

        // let originalTicketIds = fromOrder.tickets.map((ticket => !listing.tickets.map(t => t.id === ticket.id)))

        // let ticketUpdates = await strapi.db.query('api::ticket.ticket').findMany({
        //   where: { id: listing.originalTicketIds },
        // });

        // await strapi.db.query('api::order.order').update({
        //   where: { id: listing.fromOrder },
        //   data: {
        //     tickets: ticketUpdates
        //   }
        // });
      break;
      case 'payment_intent.payment_failed':
        paymentIntentId = data.data.object.id;

        order = await strapi.db.query('api::order.order').findOne({
          where: { paymentIntentId },
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
          where: { paymentIntentId },
          data: {
            status: 'failed'
          }
        });
      break;
    }
    return 200
  },
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const order = await strapi.entityService.findOne('api::order.order', data[0].id, {
      populate: { 
        tickets: true,
        event: {
          populate: {
            image: true,
            venue: {
              populate: {
                image: true,
                address: true
              }
            }
          },
        },
      },
    }); 

    return order
  }
}));
