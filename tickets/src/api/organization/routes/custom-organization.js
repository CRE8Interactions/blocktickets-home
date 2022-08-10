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
  ]
}