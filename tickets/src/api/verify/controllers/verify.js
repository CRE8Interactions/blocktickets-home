'use strict';

/**
 *  verify controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::verify.verify', ({ strapi }) => ({
  async byPhone(ctx) {
    const code = ctx.request.body.data.code
    const verify = await strapi.db.query('api::verify.verify').findOne({ 
      where: { code: code } 
    })
    if (!verify) {
      // return error when validation code is incorrect
      return ctx.badRequest('Code provided is incorrect', { message: code })
      return
    } else {
      // checks if user account is present
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({ 
        where: { phoneNumber: verify.phoneNumber }
      })      
      if (user) {
        // send jwt to client
        const tokenData = await strapi.service('api::verify.verify').sendJwt(user)
        ctx.response.status = 200
        ctx.send(tokenData)   
      } else {
        // send request to create one
        ctx.response.status = 203
        ctx.response.body = {
          phone: verify.phoneNumber
        }
      }
      // remove verify code when claimed
      await strapi.db.query('api::verify.verify').delete({
        where: { id: verify.id }
      })
    }
  },
  async newUser(ctx) {
    const { username, email, phoneNumber, gender, dob } = ctx.request.body.data;

    const userObj = {
      data: {
        username,
        email,
        phoneNumber,
        dob,
        password: process.env.DEFAULT_PW
      }
    }

    const user = await strapi.service('api::verify.verify').createUser(userObj)

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)

    ctx.send(tokenData)    
  },
  async create(ctx) {
    const response = await super.create(ctx);
    delete response.data.id
    delete response.data.attributes.code
    return response
  }
})
);
