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

 
myJob: {
    task: async ({ strapi }) => {
      // Gets new listings
      const listings = await strapi.entityService.findMany('api::listing.listing', {
        filters: {
          $and: [
            { status: 'new' }
          ]
        },
        populate: { 
          tickets: true,
          event: {
            filters: {
              $and: [
                { start: { $lte: new Date() } }
              ]
            },
            populate: {
              image: true,
              venue: {
                populate: {
                  address: true
                }
              }
            }
          },
          users_permissions_user: true
        },
      });
      // Filter listings where events are null due to being in the past
      const expiredListings = listings.filter((listing) => listing.event != null);
      // Change state to expired for listings
      const expiredListingIds = expiredListings.map((listing) => listing.id)

      await strapi.db.query('api::listing.listing').updateMany({
        where: {
          id: expiredListingIds,
        },
        data: {
          status: 'expired',
        },
      });

      strapi.service('api::email.email').notifyListingExpired(expiredListings);
    },
    options: {
       rule: '0 1 * * * *',
       tz: 'America/New_York',
    },
  },
};