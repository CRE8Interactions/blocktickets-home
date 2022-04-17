module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/payment/intent/:total',
      handler: 'payment.getClientId'
    },
  ]
}