'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * utility service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::utility.utility', ({ strapi }) => ({
  async generateUUID() {
    return uuidv4();
  } 
}));