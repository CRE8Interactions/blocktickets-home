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
  async byPhone(ctx) {
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
      // checks if user account is present
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
          phoneNumber: verify.phoneNumber
        },
        populate: ["role"],
      })
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
  async newUser(ctx) {
    const {
      username,
      email,
      phoneNumber,
      gender,
      dob
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
        dob,
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
  },
  async create(ctx) {
    const response = await super.create(ctx);
    delete response.data.id
    delete response.data.attributes.code
    return response
  }
}));
