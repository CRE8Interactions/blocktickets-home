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
  ]
}