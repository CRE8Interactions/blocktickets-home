module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/orders/finalize',
      handler: 'order.finalize'
    },
  ]
}