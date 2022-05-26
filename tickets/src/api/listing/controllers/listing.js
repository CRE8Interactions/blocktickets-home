'use strict';

/**
 *  listing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::listing.listing', ({ strapi}) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { tickets, quantity, event, serviceFees, payout, askingPrice } = ctx.request.body

    const entity = await strapi.entityService.create('api::listing.listing', {
      data: {
        tickets: tickets.map(ticket => ticket.id),
        quantity,
        event: event.id,
        users_permissions_user: user.id,
        status: 'new',
        payout,
        serviceFees,
        askingPrice
      }
    })

    await strapi.db.query('api::ticket.ticket').updateMany({
      where: { id: tickets.map(ticket => ticket.id) },
      data: {
        resale: true,
        on_sale_status: 'resaleAvailable',
        listingId: entity.id,
        listingAskingPrice: entity.askingPrice
      }
    })

    return 200
  },
  async myListings(ctx) {
    const user = ctx.state.user;

    const entries = await strapi.db.query('api::listing.listing').findMany({
      where: { users_permissions_user: user.id },
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
      }
    });

    return entries
  },
  async update(ctx) {
    const user = ctx.state.user;
    const { tickets, quantity, event, serviceFees, payout, askingPrice } = ctx.request.body
    const id = ctx.params.id;

    const entry = await strapi.db.query('api::listing.listing').update({
      where: {id: id},
      data: {
        quantity,
        payout,
        serviceFees,
        askingPrice
      },
      populate: {
        tickets: true
      }
    })
    
    await strapi.db.query('api::ticket.ticket').updateMany({
      where: { id: entry.tickets.map(ticket => ticket.id) },
      data: {
        resale: true,
        on_sale_status: 'resaleAvailable',
        listingId: entry.id,
        listingAskingPrice: askingPrice
      }
    })

    return 200
  },
  async delete(ctx) {
    const user = ctx.state.user;
    const id = ctx.params.id;

    const entry = await strapi.db.query('api::listing.listing').delete({
      where: { id: id },
      populate: { tickets: true },
    });

    await strapi.db.query('api::ticket.ticket').updateMany({
      where: { id: entry.tickets.map(ticket => ticket.id) },
      data: {
        resale: false,
        on_sale_status: 'sold',
        listingId: '',
        listingAskingPrice: ''
      }
    })

    return 200
  }
}));
