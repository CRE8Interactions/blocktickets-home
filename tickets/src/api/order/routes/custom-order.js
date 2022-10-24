module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/orders/finalize',
      handler: 'order.finalize'
    },
    {
      method: 'POST',
      path: '/orders/pricing',
      handler: 'order.getPricingInfo'
    }
  ]
}