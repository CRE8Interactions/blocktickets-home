'use strict';

/**
 * invite service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::invite.invite');
