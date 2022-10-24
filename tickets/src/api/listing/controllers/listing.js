'use strict';

/**
 *  listing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::listing.listing', ({ strapi}) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { tickets, quantity, event, serviceFees, payout, askingPrice, fromOrder } = ctx.request.body

    const entity = await strapi.entityService.create('api::listing.listing', {
      data: {
        tickets: tickets.map(ticket => ticket.id),
        quantity,
        event: event.id,
        users_permissions_user: user.id,
        status: 'new',
        payout,
        serviceFees,
        askingPrice,
        fromOrder,
        total: askingPrice * quantity
      },
      populate: {
        users_permissions_user: true,
        tickets: true
      }
    })

    tickets.map(async (ticket) => {
      await strapi.db.query('api::ticket.ticket').update({
        where: { id: ticket.id },
        data: {
          resale: true,
          on_sale_status: 'resaleAvailable',
          listingId: entity.id,
          listingAskingPrice: entity.askingPrice
        }
      })
    })

    if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').listingActive(user, tickets, event, serviceFees, payout, quantity, askingPrice)
    strapi.service('api::tracking.tracking').createTicketListedTracking(entity);
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
            fee_structure: true,
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
  async byEventId(ctx) {
    const { id } = ctx.request.query;
    
    let listings = await strapi.db.query('api::listing.listing').findMany({
      where: { status: 'new'},
      populate: {
        tickets: true,
        event: {
          where: { id },
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

    listings = listings.filter((entry => entry.event && entry.event.id == id ))

    return listings
  },
  async update(ctx) {
    const user = ctx.state.user;
    const { tickets, quantity, event, serviceFees, payout, askingPrice } = ctx.request.body
    const id = ctx.params.id;

    const listing = await strapi.entityService.findOne('api::listing.listing', id, {
      fields: ['status'],
    });

    if (listing.status === 'complete') {
      return ctx.badRequest('Listing has been completed', { message: `Your listing has already been purchased`})
    }

    const entry = await strapi.db.query('api::listing.listing').update({
      where: {id: id},
      data: {
        quantity,
        payout,
        serviceFees,
        askingPrice,
        total: askingPrice * quantity
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

    const listing = await strapi.entityService.findOne('api::listing.listing', id, {
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

    if (listing.status === 'complete') {
      return ctx.badRequest('Listing has been completed', { message: `Your listing has already been purchased`})
    }

    const entry = await strapi.db.query('api::listing.listing').delete({
      where: { id: id },
      populate: { tickets: true },
    });

    entry.tickets.map(async (ticket) => {
      await strapi.db.query('api::ticket.ticket').update({
        where: { id: ticket.id },
        data: {
          resale: false,
          on_sale_status: 'available',
          listingId: '',
          listingAskingPrice: ''
        }
      })
    })

    if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').removeListing(user, listing)
    strapi.service('api::tracking.tracking').removeTicketListedTracking(entry, user);
    return 200
  },
  async availableFunds(ctx) {
    const user = ctx.state.user;

    const entries = await strapi.db.query('api::listing.listing').findMany({
      select: ['payout'],
      where: { 
        users_permissions_user: user.id,
        fundsClaimed: false,
        status: 'complete'
      }
    });

    return entries;
  }
}));
