'use strict';
const Web3API = require('web3');
const axios = require('axios');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsNumber = process.env.SMS_NUMBER;
const client = require('twilio')(accountSid, authToken);
const blockchain = process.env.BLOCKCHAIN;
const messagingServiceSid = process.env.MG80e1372892690914b598b6478a992c1a;
const myPhone = process.env.TWILIO_PHONE;
const geoURI = process.env.GEO_URI;
const geoApiKey = process.env.GCP_API_KEY;
const stripe = require('stripe')(process.env.STRIPE_KEY);
const orderId = require('order-id')('blocktickets');
// Encrypts user data
const options = {
  password: process.env.EC_PASSWORD || 'blocktickets',
  passwordSalt: process.env.DEFAULT_PW
};
const encryption = require('encryption-se')(options);

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register( /*{ strapi }*/ ) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap( /*{ strapi }*/ ) {

    let initCategories = async () => {
      const count = await strapi.db.query('api::category.category').count()

      if (count === 0) {
        const arr = [
          'music',
          'concerts',
          'sports',
          'arts & theater',
          'family',
          'vip',
          'deals'
        ]

        arr.map(async (a) => await strapi.db.query('api::category.category').create({
          data: {
            name: a
          }
        }))
      }
    }  

    let initOrganization = async () => {
      const count = await strapi.db.query('api::organization.organization').count()

      if (count === 0) {
        await strapi.db.query('api::organization.organization').create({
          data: {
            name: 'BlockTickets'
          }
        })
      }
    }

    initOrganization()
    initCategories()

    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user', 'api::profile.profile', 'api::verify.verify', 'api::invite.invite', 'api::organization.organization', 'api::venue.venue', 'api::event.event', 'api::order.order', 'api::ticket-transfer.ticket-transfer', 'api::payment-information.payment-information'],
      async afterCreate(event) {
        // afterCreate lifecycle
        const {
          result,
          params
        } = event;

        // Changes on ticket transer
        if (event.model.singularName === 'ticket-transfer') {
          // dont send SMS when running test
          if (process.env.NODE_ENV === 'test') return;

          await client.messages
            .create({
              body: `${params.data.fromUser.name} has transfer a ticket to ${params.data.event.name}, access BlockTicket.xyz and go to your wallet to claim your ticket`,
              messagingServiceSid: messagingServiceSid,
              to: params.data.phoneNumberToUser,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .done()
        }

        // Changes on Order model
        if (event.model.singularName === 'order') {
          const paymentIntent = await stripe.paymentIntents.update(
            event.params.data.paymentIntentId,
            { metadata: {order_id: result.id }}
          );
        }

        // Changes on venue
        if (event.model.singularName === 'venue') {
          const address = result.address[0];
          const address1 = address.address_1;
          const address2 = address.address_2;
          const city = address.city;
          const state = address.state;
          const query = `${address1},${city},${state}&key=${geoApiKey}`
          let geometry;

          const config = {
            method: 'post',
            url: `${geoURI}${query}`,
            headers: {}
          };
          await axios(config)
            .then((res) => {
              let data = res.data;
              geometry = data.results[0].geometry;
            })
            .catch(err => console.log(err))

          await strapi.entityService.update('api::venue.venue', result.id, {
            data: {
              address: [{
                id: result.address[0].id, // will update component with id: 1 (if not specified, would have deleted it and created a new one)
                address_1: result.address[0].address_1,
                address_2: result.address[0].address_2,
                city: result.address[0].city,
                state: result.address[0].state,
                latitude: String(geometry.location.lat),
                longitude: String(geometry.location.lng)
              }],
            },
          });
        }

        // Changes on Event Model
        if (event.model.singularName === 'event') {
          let org = await strapi.entityService.findOne('api::organization.organization', params.data.organizationId, {
            populate: { events: true}
          });
          let organization = await strapi.entityService.update('api::organization.organization', params.data.organizationId, {
            data: {
              events: [...org.events, result]
            }
          })
        }

        // Changes on Invite Model
        if (event.model.singularName === 'invite') {
          let phoneNumber = event.params.data.phoneNumber;
          let role = event.params.data.role;
          // Gets organization if one is assigned
          if (event.params.data.organization) {
            let organization = await strapi.db.query('api::organization.organization').findOne({
             where: {
              id: event.params.data.organization
             }
            });
          }
          // Create message based on role
          let message;
          if (role === 'Organizer') {
            message = `You've been granted ${role} access in BlockTickets.xyz.  You may create or edit Organization information which your a member of.`
          } else {
            message = `You've been added to the ${organization.name} organization at BlockTickets.xyz`;
          }

          await client.messages
            .create({
              body: message,
              messagingServiceSid: messagingServiceSid,
              to: phoneNumber,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .done()
        }
      },
      async beforeCreate(event) {
        // beforeCreate lifeclcyle

        // Changes on payment-formation model
        if (event.model.singularName === 'payment-information') {
          await encryption
            .encrypt(event.params.data.accountNumber)
            .then(enc => {
              event.params.data.accountNumber = enc
            })
            .catch((err) => {
              console.error('Enc error: ', err)
            })
        }


        // Changes on Order model
        if (event.model.singularName === 'order') {
          event.params.data.orderId = orderId.generate();
        }

        // Changes on Organization model
        if (event.model.singularName === 'organization') {
          let email = event.params.data.creatorId;
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
              email: email
            }
          })
          event.params.data.uuid = Math.floor(Math.random() * 900000000) + 100000000;
          event.params.data.creatorId = user.id
          event.params.data.members = [user];
          // Creates web3 wallet for organization
          const web3 = await new Web3API(new Web3API.providers.HttpProvider(blockchain));
          const account = await web3.eth.accounts.create(web3.utils.randomHex(32));
          const wallet = await web3.eth.accounts.wallet.add(account)

          const myWallet = await strapi.db.query('api::wallet.wallet').create({
            data: {
              account,
              wallet,
              keystore: wallet.encrypt(web3.utils.randomHex(32))
            }
          })
          
          event.params.data.wallet = myWallet.id
        }

        // Changes on event model
        if (event.model.singularName === 'event') {
          const categories = await strapi.db.query('api::category.category').findOne({
            where: {
              id: event.params.data.categories
            }
          })

          const venue = await strapi.db.query('api::venue.venue').findOne({
            where: {
              id: event.params.data.venue
            }
          })

          event.params.data.venue = venue.id
          event.params.data.categories = [categories]
        }

        // Changes on user model
        if (event.model.singularName === 'user') {
          const profile = await strapi.db.query('api::profile.profile').create({
            data: {
              username: event.params.data.username.toLowerCase(),
              gender: event.params.data.gender.toLowerCase(),
              name: event.params.data.name.toLowerCase(),
              // dob: event.params.data.dob
            }
          })
          event.params.data.profile = profile
          event.params.data.email = event.params.data.email.toLowerCase()
          event.params.data.username = event.params.data.username.toLowerCase()
          event.params.data.name = event.params.data.name.toLowerCase()
          event.params.data.gender = event.params.data.gender.toLowerCase()
        }

        // Changes on profile model
        if (event.model.singularName === 'profile') {
          const web3 = await new Web3API(new Web3API.providers.HttpProvider(blockchain));
          const account = await web3.eth.accounts.create(web3.utils.randomHex(32));
          const wallet = await web3.eth.accounts.wallet.add(account)

          const myWallet = await strapi.db.query('api::wallet.wallet').create({
            data: {
              account,
              wallet,
              keystore: wallet.encrypt(web3.utils.randomHex(32))
            }
          })

          event.params.data.wallet = myWallet.id
        }

        // Changes on verfiy model
        if (event.model.singularName === 'verify') {
          let phoneNumber = event.params.data.phoneNumber;
          const account = await strapi.db.query('api::verify.verify').findOne({
            where: {
              phoneNumber: phoneNumber
            }
          })
          if (account) {
            await strapi.db.query('api::verify.verify').delete({
              where: {
                id: account.id
              }
            })
          }
          let code = Math.floor(1000 + Math.random() * 9000)
          event.params.data.code = code
          event.params.data.addedAt = new Date()
          // dont send SMS when running test
          if (process.env.NODE_ENV === 'test') return;

          await client.messages
            .create({
              body: `${code} is your temporary verification code to login at BlockTickets.xyz`,
              messagingServiceSid: messagingServiceSid,
              to: phoneNumber,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .done()
        }
      },
      async beforeUpdate(event) {
        // Updates on payment-formation model
        if (event.model.singularName === 'payment-information') {
          await encryption
            .encrypt(event.params.data.accountNumber)
            .then(enc => {
              event.params.data.accountNumber = enc
            })
            .catch((err) => {
              console.error('Enc error: ', err)
            })
        }
      }
    });
  },
};
