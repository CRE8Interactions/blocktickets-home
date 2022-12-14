const moment = require('moment');

module.exports = {
  /**
  * Cron job with timezone example.
  * Every Monday at 1am for Asia/Dhaka timezone.
  * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
  */

  //  *    *    *    *    *    *
  //  ┬    ┬    ┬    ┬    ┬    ┬
  //  │    │    │    │    │    |
  //  │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  //  │    │    │    │    └───── month (1 - 12)
  //  │    │    │    └────────── day of month (1 - 31)
  //  │    │    └─────────────── hour (0 - 23)
  //  │    └──────────────────── minute (0 - 59)
  //  └───────────────────────── second (0 - 59, OPTIONAL)

  
  // listingJob: {
  //   task: async ({ strapi }) => {
  //     // Gets new listings
  //     const listings = await strapi.entityService.findMany('api::listing.listing', {
  //       filters: {
  //         $and: [
  //           { status: 'new' }
  //         ]
  //       },
  //       populate: { 
  //         tickets: true,
  //         event: {
  //           filters: {
  //             $and: [
  //               { start: { $lte: new Date() } }
  //             ]
  //           },
  //           populate: {
  //             image: true,
  //             venue: {
  //               populate: {
  //                 address: true
  //               }
  //             }
  //           }
  //         },
  //         users_permissions_user: true
  //       },
  //     });
  //     // Filter listings where events are null due to being in the past
  //     const expiredListings = listings.filter((listing) => listing.event != null);
  //     // Change state to expired for listings
  //     const expiredListingIds = expiredListings.map((listing) => listing.id)

  //     await strapi.db.query('api::listing.listing').updateMany({
  //       where: {
  //         id: expiredListingIds,
  //       },
  //       data: {
  //         status: 'expired',
  //       },
  //     });

  //     if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').notifyListingExpired(expiredListings);
  //   },
  //   options: {
  //      rule: '0 1 * * * *',
  //      tz: 'America/New_York',
  //   },
  // },
  // verifyJob: {
  //   task: async ({ strapi }) => {
  //     // Clears unclaimed verification codes over 5 minutes old
  //     const verifications = await strapi.entityService.findMany('api::verify.verify', {
  //       fields: ['id'],
  //       filters: {
  //         addedAt: {
  //           $lte: moment().subtract(5, 'minutes').format() 
  //         }
  //       },
  //     });

  //     if (verifications.legnth === 0) return;

  //     await strapi.db.query('api::verify.verify').deleteMany({
  //       where: {
  //         id: {
  //           $in: verifications.map(verifcation => verifcation.id),
  //         },
  //       },
  //     });

  //   },
  //   options: {
  //     rule: '* * * * *',
  //     tz: 'America/New_York',
  //  },
  // }
  publishEvents: {
    task: async ({ strapi }) => {
      try {
        const events = await strapi.db.query('api::event.event').updateMany({
          where: {
            $and: [
              { scheduled: true},
              { status: 'scheduled'},
              { scheduledTime: {$lte: new Date()}}
            ],
          },
          data: {
            scheduled: false,
            status: 'on_sale'
          },
        });
      } catch (err) {
        console.log('Schedule Event Error ', err)
      }
    },
    options: {
      rule: '* * * * * ',
      tz: 'America/New_York',
    }
  }
};