module.exports = {
  routes: [
  {
    method: 'POST',
    path: '/tickets/assign',
    handler: 'ticket.assign'
  },
  {
    method: 'POST',
    path: '/tickets/update-all',
    handler: 'ticket.updateAll'
  }
]
}
