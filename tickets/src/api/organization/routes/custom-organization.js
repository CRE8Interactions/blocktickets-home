module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/organizations/myOrgs',
      handler: 'organization.myOrgs'
    },
    {
      method: 'GET',
      path: '/organizations/roles',
      handler: 'organization.getRoles'
    },
    {
      method: 'GET',
      path: '/organizations/team',
      handler: 'organization.teamMembers'
    },
    {
      method: 'GET',
      path: '/organizations/events',
      handler: 'organization.getEvents'
    },
    {
      method: 'GET',
      path: '/organizations/event',
      handler: 'organization.getEvent'
    },
    {
      method: 'GET',
      path: '/organizations/event-orders',
      handler: 'organization.getOrdersByEvent'
    },
    {
      method: 'POST',
      path: '/organizations/invite-member',
      handler: 'organization.createOrEditMember'
    },
    {
      method: 'POST',
      path: '/organizations/create-payment-info',
      handler: 'organization.createPaymentInfo'
    },
    {
      method: 'POST',
      path: '/organizations/create-w9',
      handler: 'organization.createW9'
    },
    {
      method: 'POST',
      path: '/organizations/add-details',
      handler: 'organization.addEventDetails'
    },
    {
      method: 'POST',
      path: '/organizations/create-event',
      handler: 'organization.createEvent'
    },
    {
      method: 'GET',
      path: '/organizations/event-stats',
      handler: 'organization.getEventStats'
    },
    {
      method: 'GET',
      path: '/organizations/all-event-stats',
      handler: 'organization.allEventStats'
    },
    {
      method: 'GET',
      path: '/organizations/all-ticket-details',
      handler: 'organization.getTicketDetails'
    },
  ]
}