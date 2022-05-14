module.exports = {
  routes: [{
    method: 'POST',
    path: '/ticket-transfers/cancel',
    handler: 'ticket-transfer.cancelTransfer'
  },
  {
    method: 'GET',
    path: '/ticket-transfers/incoming',
    handler: 'ticket-transfer.incoming'
  },
  {
    method: 'POST',
    path: '/ticket-transfers/accept',
    handler: 'ticket-transfer.accept'
  }]
}