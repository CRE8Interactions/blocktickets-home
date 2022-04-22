'use strict';

/**
 *  venue controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::venue.venue', ({ strapi }) => ({
  async find(ctx) {
    const venues = await strapi.db.query('api::venue.venue').findMany({
      populate: { 
        image: true,
        address: true,
        allEvents: {
          populate: {
            image: true
          }
        }
      },
    });
    return venues
  }
}));
