module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/verifies/byPhone',
      handler: 'verify.byPhone'
    },
    {
      method: 'POST',
      path: '/verifies/newUser',
      handler: 'verify.newUser'
    },
  ]
}