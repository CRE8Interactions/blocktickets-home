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
  async generateCode() {
    return Math.floor(1000 + Math.random() * 9000)
  },
  async refreshDB() {
    await strapi.db.query('api::ticket.ticket').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('organization.organization').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
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

    await strapi.db.query('api::wallet.wallet').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::profile.profile').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::user.user').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::page-view.page-view').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::organization-role.organization-role').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::w9.w9').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::invite-team-member.invite-team-member').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::event.event').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });
  } 
}));