'use strict';

/**
 * guest-pass router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::guest-pass.guest-pass');
