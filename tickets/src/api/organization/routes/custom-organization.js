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
  ]
}