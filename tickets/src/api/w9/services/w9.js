'use strict';

/**
 * w9 service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::w9.w9');
