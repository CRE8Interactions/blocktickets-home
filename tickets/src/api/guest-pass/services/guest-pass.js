'use strict';

/**
 * guest-pass service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::guest-pass.guest-pass');
