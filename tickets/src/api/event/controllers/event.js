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
        fee_structure: true,
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

    const event = await strapi.db.query('api::event.event').findOne({
      select: ['id', 'name', 'start', 'summary', 'end', 'presentedBy', 'views', 'hide_end_date', 'display_start_time'],
      where: { uuid: id },
      populate: {
        image: true,
        categories: true,
        page_views: true,
        fee_structure: true,
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
          fields: ['username', 'email', 'phoneNumber', 'firstName', 'lastName']
        },
        event: {
          populate: {
            fee_structure: true,
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
        fee_structure: true,
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
      venue,
      hide_end_date,
      display_start_time,
      hide_doors_open,
      doorsOpen
     } = ctx.request.body.data;

     let eventVenue = await strapi.db.query('api::venue.venue').findOne({
      where: { id: venue }
     })

    const entry = await strapi.db.query('api::event.event').update({
      where: { uuid: uuid },
      data: {
        presentedBy,
        name,
        start,
        end,
        venue: eventVenue,
        hide_end_date,
        display_start_time,
        hide_doors_open,
        doorsOpen
      },
    });

    return entry
  }
}));
