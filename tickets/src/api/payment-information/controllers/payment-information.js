'use strict';

// Encrypts user data
const options = {
  password: process.env.EC_PASSWORD || 'blocktickets',
  passwordSalt: process.env.DEFAULT_PW
};
const encryption = require('encryption-se')(options);

/**
 *  payment-information controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment-information.payment-information', ({ strapi }) => ({
  async findOrCreate(ctx) {
    let user = ctx.state.user;
    let { accountNumber, routingNumber, firstName, lastName, currency, accountName, accountType } = ctx.request.body.data;
    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        profile: true
      }
    })

    let profile = await strapi.db.query('api::profile.profile').findOne({
      where: {
        id: user.profile.id
      },
      populate: {
        payment_information: {
          where: {
            active: true
          }
        }
      }
    })

    let res;

    if (!profile.payment_information) {
      res = await strapi.db.query('api::profile.profile').update({
        where: {
          id: user.profile.id 
        },
        populate: {
          payment_information: true
        },
        data: {
          payment_information: await strapi.db.query('api::payment-information.payment-information').create({
            data: {
              accountNumber,
              routingNumber,
              accountName,
              currency,
              firstName,
              lastName,
              accountType
            }
          })
        }
      })
      strapi.service('api::email.email').sendPaymentAccount(res, user)
    } else {
      res = await strapi.db.query('api::payment-information.payment-information').update({
        where: {
          id: profile.payment_information.id
        },
        data: {
          accountNumber,
          routingNumber,
          accountName,
          currency,
          firstName,
          lastName,
          accountType
        }
      })
      strapi.service('api::email.email').updatePaymentAccount(res, user)
    }
    return res
  },
  async findOne(ctx) {
    let user = ctx.state.user;
    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        profile: {
          populate: {
            payment_information: {
              where: {
                active: true
              }
            }
          }
        }
      }
    })

    if (user.profile.payment_information) {
      await encryption
      .decrypt(user.profile.payment_information.accountNumber)
      .then((text) => {
        user.profile.payment_information.accountNumber = text
      })
      .catch((err) => {
        // This is to handle errors
      })

      return user.profile.payment_information
    } else {
      return 404
    }

    
  },
  async deactive(ctx) {
    let user = ctx.state.user;

    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        profile: true
      }
    })

    let profile = await strapi.db.query('api::profile.profile').findOne({
      where: {
        id: user.profile.id
      },
      populate: {
        payment_information: {
          where: {
            active: true
          }
        }
      }
    })

    await strapi.db.query('api::payment-information.payment-information').update({
      where: {
        id: profile.payment_information.id
      },
      data: {
        active: false
      }
    })

    return 200
  }
}));
