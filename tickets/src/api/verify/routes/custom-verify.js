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
    {
      method: 'POST',
      path: '/verifies/personalDetails',
      handler: 'verify.updatePersonalDetails'
    },
    {
      method: 'POST',
      path: '/verifies/emailValid',
      handler: 'verify.emailValid'
    },
  ]
}