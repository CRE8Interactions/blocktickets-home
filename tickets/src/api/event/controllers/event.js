'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi}) => ({
  async publish(ctx) {
    const eventId = ctx.request.body.id;
    let event = await strapi.db.query('api::event.event').update({
      where: { id: eventId },
      data: {
        status: 'on_sale'
      }
    });

    return 200;
  }
}));
