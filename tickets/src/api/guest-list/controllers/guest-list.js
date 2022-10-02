'use strict';

/**
 *  guest-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::guest-list.guest-list', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const { data, meta } = await super.find(ctx);

    const entries = await strapi.db.query('api::guest-list.guest-list').findMany({
      where: { phoneNumber: query.phoneNumber },
      orderBy: { requested: 'DESC' },
      populate: { 
        guest_passes: true,
        event: {
          populate: {
            image: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      },
    });
    return entries
  }
}));
