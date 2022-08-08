'use strict';

/**
 *  organization controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::organization.organization', ({ strapi }) => ({
  async myOrgs(ctx) {
    const user = ctx.state.user
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        events: {
          fields: ['*'],
          populate: {
            image: true,
            tickets: true,
            venue: true,
            artists: true
          }
        }
      }
    })
    // Returns organizations which user is a member of
    organizations = organizations.filter(org => org.members.length >= 1)
    // Sanitizes response
    organizations = organizations.map(org => {
      org.members.map(member => {
        delete member.password
        delete member.resetPasswordToken
        delete member.confirmationToken
        delete member.provider
      })
      return org
    })

    return organizations
  },
  async addMember(ctx) {
    // future code
  }
}));
