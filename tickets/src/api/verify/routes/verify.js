'use strict';

/**
 * verify router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::verify.verify');
