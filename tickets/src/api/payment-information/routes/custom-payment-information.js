module.exports = {
  routes: [{
    method: 'POST',
    path: '/payment-information/generate',
    handler: 'payment-information.findOrCreate'
  }, ]
}