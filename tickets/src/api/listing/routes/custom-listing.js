module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/listings/mylisting',
      handler: 'listing.myListings'
    },
    {
      method: 'GET',
      path: '/listings/byEvent',
      handler: 'listing.byEventId'
    },
    {
      method: 'GET',
      path: '/listings/available-funds',
      handler: 'listing.availableFunds'
    }
  ]
}