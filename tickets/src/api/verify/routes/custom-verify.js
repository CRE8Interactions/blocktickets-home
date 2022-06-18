module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/verifies/by-phone-or-email',
      handler: 'verify.byPhoneOrEmail'
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
    {
      method: 'POST',
      path: '/verifies/change-number',
      handler: 'verify.updateNumber'
    },
    {
      method: 'POST',
      path: '/verifies/confirm-update',
      handler: 'verify.confirmUpdate'
    },
  ]
}