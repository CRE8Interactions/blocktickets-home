'use strict';

/**
 * sales-tax service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sales-tax.sales-tax');
