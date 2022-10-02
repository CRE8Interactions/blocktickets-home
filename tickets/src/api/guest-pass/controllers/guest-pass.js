'use strict';

/**
 *  guest-pass controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::guest-pass.guest-pass');
