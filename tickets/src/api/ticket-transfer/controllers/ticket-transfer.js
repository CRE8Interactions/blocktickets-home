'use strict';

/**
 *  ticket-transfer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket-transfer.ticket-transfer', ({ strapi}) => ({
  async create(ctx) {
    console.log(params)
  }
}));
