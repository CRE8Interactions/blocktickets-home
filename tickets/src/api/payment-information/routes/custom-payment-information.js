module.exports = {
  routes: [{
    method: 'POST',
    path: '/payment-information/generate',
    handler: 'payment-information.findOrCreate'
  },{
    method: 'GET',
    path: '/payment-information/deactive',
    handler: 'payment-information.deactive'
  }, ]
}