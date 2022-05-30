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
        status: 'on_sale',
        start: {
          $gte: new Date()
        }
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
      fields: ['id', 'name', 'start', 'summary', 'end', 'presentedBy, views'],
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
    
   const updatedEvent = await strapi.db.query('api::event.event').update({
      where: { id: event.id },
      data: {
        views: parseInt(event.views) + 1,
      },
    });

    return event
  },
  async myUpcomingEvents(ctx) {
    let user = ctx.state.user

    const order = await strapi.entityService.findMany('api::order.order', {
      filters: {
        $and:[
          { status: ['complete', 'completeFromTransfer']},
          { userId: user.id },
        ]
      },
      populate: {
        users_permissions_user: {
          fields: ['name', 'username', 'email', 'phoneNumber']
        },
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
        tickets: {
          filters: {
            $not: {
              on_sale_status: 'resaleAvailable'
            }
          }
        },

      }
    })

    return order
  },
  async search(ctx) {
    let query = ctx.request.body.data
    let events = await strapi.db.query('api::event.event').findMany({
      where: {
        $and: [
          { status: 'on_sale' },
          { name: { $containsi: query } }
        ]
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
  }
}));
