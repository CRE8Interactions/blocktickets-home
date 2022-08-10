'use strict';

/**
 *  organization-role controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::organization-role.organization-role', ({ strapi}) => ({
  async getRoles(ctx) {
    const user = ctx.state.user;
    let organization = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        organizationRoles: true
      }
    })
    // Returns organizations which user is a member of
    organization = organization.filter(org => org.members.length >= 1)
    // Get Organization Roles
    let roles = await strapi.entityService.findMany('api::organization-role.organization-role', {
      populate: {
        organization: {
          filters: {
            uuid: {
              $eq: organization[0].uuid
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    roles = roles.filter(role => role.organization && role.organization.uuid === organization[0].uuid)

    return roles;
  },
  async createOrEditRole(ctx) {
    const user = ctx.state.user;

    const {
      roleName,
      permissions
    } = ctx.request.body.data;
    console.log('Role ', roleName)
    console.log('Permissions ', permissions)
    let organization = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        organizationRoles: true
      }
    })
    // Returns organizations which user is a member of
    organization = organization.find(org => org.members.length >= 1)
    // Get Org roles
    let role = await strapi.entityService.findMany('api::organization-role.organization-role', {
      filters: {
        name: {
          $containsi: roleName,
        },
      },
      populate: {
        organization: {
          filters: {
            uuid: {
              $eq: organization.uuid
            }
          }
        }
      }
    })

    role = role.find((role) => role.organization?.uuid === organization.uuid && role?.name.toLowerCase() === roleName.toLowerCase())
    console.log('Role ', role)

    if (!role) {
      role = await strapi.entityService.create('api::organization-role.organization-role', {
        data: {
          name: roleName,
          organization,
          organization_permissions: [...permissions]
        }
      })
    } else {
      role = await strapi.entityService.update('api::organization-role.organization-role', role.id, {
        data: {
          name: roleName,
          organization,
          organization_permissions: [...permissions]
        },
      });
    }
    console.log('Org ', organization)
    return 200
  }
}));
