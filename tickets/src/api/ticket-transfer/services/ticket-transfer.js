'use strict';

/**
 * ticket-transfer service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ticket-transfer.ticket-transfer');
