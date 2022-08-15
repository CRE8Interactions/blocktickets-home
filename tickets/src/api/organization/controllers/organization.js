'use strict';
const moment = require('moment');

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
  async teamMembers(ctx) {
    const user = ctx.state.user
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
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
    let organization = organizations.find(org => org.members.length >= 1)

    organization = await strapi.entityService.findOne('api::organization.organization', organization.id, {
      populate: {
        members: {
          fields: ['firstName', 'lastName', 'uuid', 'email'],
          populate: {
            organization_role: true
          }
        }
      },
    });

    return organization
  },
  async createOrEditMember(ctx) {
    const user = ctx.state.user;
    let entry;

    const {
      firstName,
      lastName,
      email,
      role,
      name,
      uuid
    } = ctx.request.body.member;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
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
    let organization = organizations.find(org => org.members.length >= 1)

    const orgRole = await strapi.entityService.findOne('api::organization-role.organization-role', Number(role), {
      
    });

    if (!uuid) {
      entry = await strapi.entityService.create('api::invite-team-member.invite-team-member', {
        data: {
          firstName,
          lastName,
          email,
          organization: organization.id,
          role
        },
      });
    }
    return user
  },
  async getRoles(ctx) {
    const roles = await strapi.db.query('plugin::users-permissions.role').findMany()

    return roles
  },
  async createPaymentInfo(ctx) {
    const user = ctx.state.user;

    const {
      companyName,
      bankName,
      accountNumber,
      routingNumber,
      type,
      address,
      address2,
      city,
      state,
      zip_code
    } = ctx.request.body.data;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
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
    let organization = organizations.find(org => org.members.length >= 1)

    let account = await strapi.entityService.create('api::organization-payment-information.organization-payment-information', {
      data: {
        companyName,
        bankName,
        accountNumber,
        routingNumber,
        accountType: type,
        organization: organization.id,
        currency: 'USD',
        address: {
          address_1: address,
          address_2: address2,
          city,
          state,
          zipcode: zip_code,
          country: 'US'
        }
      },
    });

    return account
  },
  async createW9(ctx) {
    const user = ctx.state.user;

    const {
      taxCode,
      corporation,
      ein,
      sign_by,
      sign_date,
      address,
      address2,
      city,
      state,
      zip_code
    } = ctx.request.body.data;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
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
    let organization = organizations.find(org => org.members.length >= 1)

    let w9 = await strapi.entityService.create('api::w9.w9', {
      data: {
        taxClassification: corporation,
        exemptionCodes: taxCode,
        ein,
        signed: moment(sign_date).toISOString(),
        ipAddress: ctx.request.ip,
        organization: organization.id,
        signedBy: sign_by,
        address: {
          address_1: address,
          address_2: address2,
          city,
          state,
          zipcode: zip_code,
          country: 'US'
        }
      },
    });

    return w9
  },
  async getEvents(ctx) {
    const user = ctx.state.user;

    // Get Organizations member belongs to
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
          populate: {
            tickets: true,
            image: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    return organization?.events;
  }
}));
