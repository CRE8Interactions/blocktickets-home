'use strict';

/**
 * payment-information service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::payment-information.payment-information');
