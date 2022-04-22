module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/payment/intent',
      handler: 'payment.getClientId'
    },
  ]
}