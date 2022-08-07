'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * utility service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::utility.utility', ({ strapi }) => ({
  async generateUUID() {
    return uuidv4();
  },
  async refreshDB() {
    await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        $or: [
          {
            on_sale_status: { $notIn: 'available'}
          },
          {
            transferred: true,
          },
          {
            resale: true,
          }
        ]
      },
      data: {
        on_sale_status: 'available',
        trasferred: false,
        resale: false,
        listingAskingPrice: null,
        listingId: null
      },
    });

    await strapi.db.query('api::order.order').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::ticket-transfer.ticket-transfer').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::listing.listing').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::history.history').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::payment-information.payment-information').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::verify.verify').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::tracking.tracking').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });
  } 
}));