'use strict';

/**
 *  ticket controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({
  strapi
}) => ({
  async assign(ctx) {
    console.log('Ticket Data ', ctx.request.body);
    return true
  }
}));
