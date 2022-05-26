module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/events/publish',
      handler: 'event.publish'
    },
    {
      method: 'GET',
      path: '/events/myUpcomingEvents',
      handler: 'event.myUpcomingEvents'
    },
    {
      method: 'POST',
      path: '/events/search',
      handler: 'event.search'
    },
  ]
}