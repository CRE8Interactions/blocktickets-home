'use strict';

/**
 * update-number service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::update-number.update-number');
