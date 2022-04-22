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
  },
  async find(ctx) {
    let events = await strapi.db.query('api::event.event').findMany({
      where: {
        status: 'on_sale'
      },
      populate: {
        venue: {
          populate: {
            image: true,
            address: true
          }
        },
        artists: true,
        image: true
      }
    })

    return events
  },
  async findOne(ctx) {
    let path = ctx.request.path
    let id = path.split('/')[3];
    const event = await strapi.entityService.findOne('api::event.event', id, {
      fields: ['id', 'name', 'start', 'summary', 'end', 'presentedBy'],
      populate: {
        image: true,
        categories: true,
        venue: {
          populate: {
            address: true
          }
        }
      }
    });
    return event
  },
  async myUpcomingEvents(ctx) {
    let user = ctx.state.user
    let order = await strapi.db.query('api::order.order').findMany({
      populate: { 
        event: {
          where: {
            start: { $gte: new Date() }
          },
          populate: {
            venue: {
              populate: {
                address: true
              }
            },
            image: true,
          }
        },
        tickets: true,
        user_permissions_user: {
          where: {
            id: user.id
          }
        }
      },
    });

    return order
  }
}));
