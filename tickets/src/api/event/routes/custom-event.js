module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/events/publish',
      handler: 'event.publish'
    },
  ]
}