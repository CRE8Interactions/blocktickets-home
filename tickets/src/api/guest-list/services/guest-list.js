'use strict';

/**
 * guest-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::guest-list.guest-list');
