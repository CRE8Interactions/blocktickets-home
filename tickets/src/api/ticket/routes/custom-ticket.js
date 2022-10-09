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
  },
  {
    method: 'POST',
    path: '/tickets/inactivate',
    handler: 'ticket.makeInactive'
  },
  {
    method: 'GET',
    path: '/tickets/available',
    handler: 'ticket.availableTickets'
  }
]
}
