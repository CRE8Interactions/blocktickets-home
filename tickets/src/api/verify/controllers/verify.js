'use strict';

/**
 *  verify controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::verify.verify', ({
  strapi
}) => ({
  async byPhoneOrEmail(ctx) {
    const code = ctx.request.body.data.code
    const verify = await strapi.db.query('api::verify.verify').findOne({
      where: {
        code: code
      }
    })
    if (!verify) {
      // return error when validation code is incorrect
      return ctx.badRequest('Code provided is incorrect', {
        message: code
      })
      return
    } else {
      // checks if user account is present by phone
      let user;
      if (verify.phoneNumber) {
        user = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            phoneNumber: verify.phoneNumber
          },
          populate: ["role"],
        })
      }
      // checks if user account is present by email
      if (verify.email) {
        user = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            email: verify.email
          },
          populate: ["role"],
        })
      }
      
      if (user) {
        // Checks if invite present for user
        const invite = await strapi.db.query('api::invite.invite').findOne({
          where: {
            phoneNumber: verify.phoneNumber,
            claimed: false
          }
        })

        if (invite) {
          // Gets Role from Strapi
          const role = await strapi.db.query('plugin::users-permissions.role').findOne({
            where: {
              name: invite.role
            }
          })
          // Adds role to user
          if (role) {
            await strapi.db.query('plugin::users-permissions.user').update({
              where: {
                phoneNumber: verify.phoneNumber
              },
              data: {
                role: role
              }
            })
            // Adds user to Organization if ones provided
            if (invite.organizationId) {
              let organization = await strapi.db.query('api::organization.organization').findOne({
                where: {
                  id: Number(invite.organizationId),
                },
                populate: ['members']
              })
              // Appends user to members
              let members = [...organization.members, user]

              await strapi.db.query('api::organization.organization').update({
                where: {
                  id: invite.organizationId,
                },
                data: {
                  members: members
                }
              })
            }
          }
          // Claims invite
          await strapi.db.query('api::invite.invite').update({
            where: {
              id: invite.id
            },
            data: {
              claimed: true
            }
          })
        }

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
        where: {
          id: verify.id
        }
      })
    }
  },
  async uniquePhone(ctx) {
    const { phoneNumber } = ctx.request.body.data;
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        phoneNumber: phoneNumber
      }
    })

    if (!user) return 200
    if (user) return 404
  },
  async newUser(ctx) {
    const {
      username,
      email,
      phoneNumber,
      gender,
      // dob,
      firstName,
      lastName
    } = ctx.request.body.data;

    const invite = await strapi.db.query('api::invite.invite').findOne({
      where: {
        phoneNumber: phoneNumber,
        claimed: false
      }
    })

    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: {
        name: invite && invite.role ? invite.role : 'Authenticated'
      }
    })

    const userObj = {
      data: {
        username,
        email,
        phoneNumber,
        firstName,
        lastName,
        gender,
        // dob: new Date(dob),
        role,
        confirmed: true,
        password: process.env.DEFAULT_PW
      }
    }

    let user = await strapi.service('api::verify.verify').createUser(userObj)

    user = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { id: user.id },
      populate: ["role"],
    });

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)

    ctx.send(tokenData)
    if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').signupConfirmation(user)
  },
  async create(ctx) {
    const { phoneNumber, email } = ctx.request.body.data;
    let verify;
    if (phoneNumber) {
      verify = await strapi.entityService.create('api::verify.verify', {
        data: {
          phoneNumber
        }
      })
    }
    if (email) {
      verify = await strapi.entityService.create('api::verify.verify', {
        data: {
          email
        }
      })
    }
    delete verify.code
    delete verify.id

    return verify
  },
  async updatePersonalDetails(ctx) {
    let user = ctx.state.user

    const {
      username,
      email,
      gender,
      dob,
      firstName,
      lastName
    } = ctx.request.body.data;

    user = await strapi.entityService.update("plugin::users-permissions.user", user.id, {
      data: {
        username,
        email,
        gender,
        dob,
        firstName,
        lastName
      }
    })

    if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').personalDetailsUpdate(user)

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)
    ctx.send(tokenData)
  },
  async emailValid(ctx) {
    const email = ctx.request.body.data.email;

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        email: email
      }
    })

    if (user) return 200
    if (!user) return 404
  },
  async updateNumber(ctx) {
    const user = ctx.state.user;
    const { toNumber } = ctx.request.body.data;

    let verify = await strapi.entityService.create('api::update-number.update-number', {
      data: {
        users_permissions_user: user.id,
        fromNumber: user.phoneNumber,
        toNumber,
      }
    })
    delete verify.code
    delete verify.id
    
    return verify
  },
  async confirmUpdate(ctx) {
    const { code } = ctx.request.body.data;
    let user = ctx.state.user;

    const entry = await strapi.db.query('api::update-number.update-number').findOne({
      where: { 
        $and: [
          { code: code },
          { completed: false }
        ]
       },
    });

    if (!entry) return;

    user = await strapi.db.query('plugin::users-permissions.user').update({
      where: {id: user.id },
      data: {
        phoneNumber: entry.toNumber
      }
    });

    await strapi.db.query('api::update-number.update-number').update({
      where: {id: entry.id },
      data: {
        completed: true
      }
    });

    if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').phoneUpdate(entry.toNumber, user)

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)

    return tokenData
  },
  async adminSignUp(ctx) {
    const {
      identifier,
      firstName,
      lastName,
      password
    } = ctx.request.body.data;

    console.log(identifier)


    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: {
        name: 'Organizer'
      }
    })

    const userObj = {
      data: {
        username: identifier,
        email: identifier,
        firstName,
        lastName,
        gender: 'other',
        role,
        confirmed: true,
        password
      }
    }

    let user = await strapi.service('api::verify.verify').createUser(userObj)

    user = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { id: user.id },
      populate: ["role"],
    });

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)

    return tokenData;
  },
  async adminCreateOrg(ctx) {
    const user = ctx.state.user;

    const {
      orgName,
      address,
      city,
      state,
      zip_code
    } = ctx.request.body.data;

    let org = await strapi.entityService.create('api::organization.organization', {
      data: {
        name: orgName,
        creatorId: user.uuid,
        members: [user],
        address: {
          address_1: address,
          city,
          state,
          zipcode: zip_code,
          country: 'US'
        }
      }
    })

    return org;
  }
}));
