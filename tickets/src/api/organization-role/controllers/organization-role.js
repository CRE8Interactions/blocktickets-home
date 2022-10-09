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
        },
        organization_permissions: true,
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
      permissions,
      currentRole
    } = ctx.request.body.data;

    let organization = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    organization = organization.find(org => org.members.length >= 1)

    if (!currentRole) {
      await strapi.entityService.create('api::organization-role.organization-role', {
        data: {
          name: roleName,
          organization,
          organization_permissions: [...permissions]
        }
      })
    } else {
      await strapi.entityService.update('api::organization-role.organization-role', currentRole.id, {
        data: {
          name: roleName,
          organization,
          organization_permissions: [...permissions]
        },
      });
    }

    // Get Organization Roles
    let roles = await strapi.entityService.findMany('api::organization-role.organization-role', {
      populate: {
        organization: {
          filters: {
            uuid: {
              $eq: organization.uuid
            }
          }
        },
        organization_permissions: true,
      }
    })
    // Returns organizations which user is a member of
    roles = roles.filter(role => role.organization && role.organization.uuid === organization.uuid)

    return roles
  },
  async removeRole(ctx) {
    const user = ctx.state.user;

    const {
      roleId
    } = ctx.request.body.data;

    const entry = await strapi.entityService.delete('api::organization-role.organization-role', roleId);

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

     // Get Organization Roles
     let roles = await strapi.entityService.findMany('api::organization-role.organization-role', {
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
    // Returns organizations which user is a member of
    roles = roles.filter(role => role.organization && role.organization.uuid === organization.uuid)

    return roles;
  }
}));
