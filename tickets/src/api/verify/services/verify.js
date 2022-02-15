'use strict';

/**
 * verify service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::verify.verify', ({ strapi }) => ({
  async sendJwt(user) {
    const jwt = await strapi.plugins[
      'users-permissions'
    ].services.jwt.issue({ id: user.id });

    // remove values from response
    delete user.provider
    delete user.password
    delete user.resetPasswordToken
    delete user.confirmationToken
    delete user.confirmed
    delete user.blocked
    delete user.id
    delete user.dob
    delete user.phoneNumber
    delete user.createdAt
    delete user.updatedAt

    const data = {
      jwt,
      user
    }

    return data
  },
  async createUser(userObj) {
    const user = await strapi.db.query('plugin::users-permissions.user').create(userObj)
    return user
  }
})
);
