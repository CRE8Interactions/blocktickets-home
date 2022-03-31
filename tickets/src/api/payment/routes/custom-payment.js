module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/payment/intent',
      handler: 'payment.getClientId'
    },
  ]
}