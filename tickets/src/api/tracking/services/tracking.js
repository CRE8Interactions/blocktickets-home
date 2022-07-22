'use strict';

/**
 * tracking service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tracking.tracking', ({ strapi }) => ({
  createOrderTracking(order) {
    delete order.users_permissions_user.password
    order.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: order.users_permissions_user,
          order: order.id,
          type: 'standard purchase',
          state: order
        }
      });

      let ticketHistory = await strapi.db.query('api::history.history').create({
        data: {
          ticket: ticket.id,
          order: order.id,
          trackings: tracking
        }
      });
    });
  },
  createTicketListedTracking(listing) {
    delete listing.users_permissions_user.password
    listing.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: listing.users_permissions_user,
          type: 'listed for resale',
          state: listing
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  },
  removeTicketListedTracking(entry, user) {
    delete user.password
    entry.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: user,
          type: 'removed from listing',
          state: entry
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  },
  purchaseFromListing(originalOrder, listing) {
    listing.tickets.map(async (ticket) => {
      delete originalOrder.users_permissions_user.password;
      delete listing.users_permissions_user.password;

      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: listing.users_permissions_user,
          purchasee: originalOrder.users_permissions_user,
          type: 'purchased from resale',
          state: listing
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  },
  pendingTransfer(entry) {
    entry.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: entry.fromUserId,
          type: 'pending transfer',
          state: entry
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  },
  cancelTransfer(entry, user) {
    delete user.password;

    entry.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: user,
          type: 'transfer cancelled',
          state: entry
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  },
  acceptTransfer(entry, fromUser, user) {
    delete user.password;
    delete fromUser.password;

    entry.tickets.map(async (ticket) => {
      let tracking = await strapi.db.query('api::tracking.tracking').create({
        data: {
          ticket: ticket.id,
          purchaser: fromUser,
          purchasee: user,
          type: 'transfer accepted',
          state: entry
        }
      });

      let history = await strapi.db.query('api::history.history').findOne({
        where: { ticket: ticket.id },
        populate: {
          trackings: true
        }
      })

      await strapi.db.query('api::history.history').update({
        where: { id: history.id },
        data: {
          trackings: [...history.trackings, tracking]
        }
      })
    })
  }
}));
