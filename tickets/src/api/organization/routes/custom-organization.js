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
      method: 'POST',
      path: '/organizations/create-promo',
      handler: 'organization.createPromoLink'
    },
    {
      method: 'POST',
      path: '/organizations/remove-member',
      handler: 'organization.removeTeamMember'
    },
    {
      method: 'POST',
      path: '/organizations/add-member',
      handler: 'organization.addMemberToTeam'
    },
    {
      method: 'POST',
      path: '/organizations/update-details',
      handler: 'organization.updateDetails'
    },
    {
      method: 'POST',
      path: '/organizations/update-user-email',
      handler: 'organization.updateUserEmail'
    },
    {
      method: 'POST',
      path: '/organizations/update-users-name',
      handler: 'organization.updateUsersName'
    },
    {
      method: 'POST',
      path: '/organizations/update-users-password',
      handler: 'organization.resetPassword'
    },
    {
      method: 'POST',
      path: '/organizations/email-valid',
      handler: 'organization.emailValid'
    },
    {
      method: 'POST',
      path: '/organizations/create-guest-list',
      handler: 'organization.createGuestList'
    },
    {
      method: 'POST',
      path: '/organizations/remove-guest-list',
      handler: 'organization.removeGuestList'
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
    {
      method: 'GET',
      path: '/organizations/promo-stats',
      handler: 'organization.getPromoLinks'
    },
    {
      method: 'GET',
      path: '/organizations/payment-info',
      handler: 'organization.getPaymentInfo'
    },
    {
      method: 'GET',
      path: '/organizations/invite-valid',
      handler: 'organization.inviteValid'
    },
    {
      method: 'GET',
      path: '/organizations/my-permissions',
      handler: 'organization.myPermissions'
    },
    {
      method: 'GET',
      path: '/organizations/w9',
      handler: 'organization.getW9'
    },
    {
      method: 'GET',
      path: '/organizations/event-ticket-types',
      handler: 'organization.ticketTypes'
    },
    {
      method: 'GET',
      path: '/organizations/guest-list',
      handler: 'organization.guestList'
    },
  ]
}