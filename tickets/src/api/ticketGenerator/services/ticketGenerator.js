'use strict';

/**
 * ticketGenerator service.
 */

const {
  createCoreService
} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ticketGenerator.ticketGenerator', ({
  strapi
}) => ({
  async create(params) {
    console.log(params)
  }
}));
