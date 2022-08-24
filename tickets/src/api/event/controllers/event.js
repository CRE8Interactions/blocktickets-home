'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi}) => ({
  async publish(ctx) {

    const {
      publishType,
      publishDate,
      event
    } = ctx.request.body.data;

    let entry;

    if (Number(publishType) === 1) {
      entry = await strapi.db.query('api::event.event').update({
        where: { id: event.id },
        data: {
          status: 'on_sale'
        }
      });
    } else {
      entry = await strapi.db.query('api::event.event').update({
        where: { id: event.id },
        data: {
          status: 'scheduled',
          scheduled: true,
          scheduledTime: publishDate
        }
      });
    }

    return entry;
  },
  async find(ctx) {
    let events = await strapi.db.query('api::event.event').findMany({
      orderBy: { start: 'asc' },
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

    const pageView = await strapi.entityService.create('api::page-view.page-view', {
      data: {
        seen: new Date(),
        event: Number(id)
      },
    });
    
    let event = await strapi.entityService.findOne('api::event.event', id, {
      fields: ['id', 'name', 'start', 'summary', 'end', 'presentedBy, views'],
      populate: {
        image: true,
        categories: true,
        page_views: true,
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

    const order = await strapi.entityService.findMany('api::order.order', {
      filters: {
        $and:[
          { status: ['complete', 'completeFromTransfer']},
          { userId: user.id },
        ]
      },
      populate: {
        users_permissions_user: {
          fields: ['username', 'email', 'phoneNumber']
        },
        event: {
          filters: {
            $and: [
              { start: { $gte: new Date() } }
            ]
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
            on_sale_status: {
              $notIn: ['resaleAvailable', 'pendingTransfer']
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
          { name: { $containsi: query } },
          { start: {$gte: new Date().toISOString() }}
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
  },
  async refreshAll(ctx) {
   if (process.env.NODE_ENV === 'production') return;
    await strapi.service('api::utility.utility').refreshDB();
   return 200;
  },
  async updateEvent(ctx) {
    const { 
      uuid,
      presentedBy,
      name,
      start,
      end,
      venue
     } = ctx.request.body.data;

    const entry = await strapi.db.query('api::event.event').update({
      where: { uuid: uuid },
      data: {
        presentedBy,
        name,
        start,
        end,
        venue
      },
    });

    return entry
  }
}));
