module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/organization-roles/roles',
      handler: 'organization-role.getRoles'
    },
    {
      method: 'POST',
      path: '/organization-roles/create',
      handler: 'organization-role.createOrEditRole'
    },
    {
      method: 'POST',
      path: '/organization-roles/remove',
      handler: 'organization-role.removeRole'
    },
  ]
}