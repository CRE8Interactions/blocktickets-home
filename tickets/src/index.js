'use strict';
const Web3API = require('web3');
const axios = require('axios');
const order = require('./api/order/controllers/order');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsNumber = process.env.SMS_NUMBER;
const smsNotificationsNumber = process.env.SMS_NOTIFICATIONS_NUMBER;
const client = require('twilio')(accountSid, authToken);
const blockchain = process.env.BLOCKCHAIN;
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID;
const notificationsServiceSid = process.env.MESSAGING_NOTIFICATIONS_SERVICE_SID;
const myPhone = process.env.TWILIO_PHONE;
const geoURI = process.env.GEO_URI;
const geoApiKey = process.env.GCP_API_KEY;
const stripe = require('stripe')(process.env.STRIPE_KEY);
const orderId = require('order-id')('blocktickets');
const moment = require('moment');
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

    let resetDevelopmentEnv = async () => {
      await strapi.db.query('api::ticket.ticket').updateMany({
        where: {
          $or: [
            {
              on_sale_status: { $notIn: 'available'}
            },
            {
              transferred: true,
            },
            {
              resale: true,
            }
          ]
        },
        data: {
          on_sale_status: 'available',
          trasferred: false,
          resale: false,
          listingAskingPrice: null,
          listingId: null
        },
      });

      await strapi.db.query('api::order.order').deleteMany({
        where: {
          createdAt: {
            $lte: new Date()
          },
        },
      });

      await strapi.db.query('api::ticket-transfer.ticket-transfer').deleteMany({
        where: {
          createdAt: {
            $lte: new Date()
          },
        },
      });

      await strapi.db.query('api::listing.listing').deleteMany({
        where: {
          createdAt: {
            $lte: new Date()
          },
        },
      });

      await strapi.db.query('api::payment-information.payment-information').deleteMany({
        where: {
          createdAt: {
            $lte: new Date()
          },
        },
      });

      await strapi.db.query('api::verify.verify').deleteMany({
        where: {
          createdAt: {
            $lte: new Date()
          },
        },
      });
    }

    initOrganization()
    initCategories()
    // resetDevelopmentEnv()

    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user', 'api::profile.profile', 'api::verify.verify', 'api::invite.invite', 'api::organization.organization', 'api::venue.venue', 'api::event.event', 'api::order.order', 'api::ticket-transfer.ticket-transfer', 'api::payment-information.payment-information', 'api::update-number.update-number'],
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

          if (process.env.NODE_ENV === 'development') {
            console.log(`${params.data.fromUser.firstName} ${params.data.fromUser.lastName} has transferred you ticket(s) to ${params.data.event.name}, Log in or create a new account on BlockTicket.xyz and go to My Wallet and select My Events to claim your ticket(s)`);
            return
          }

          await client.messages
            .create({
              body: `${params.data.fromUser.firstName} ${params.data.fromUser.lastName} has transferred you ticket(s) to ${params.data.event.name}, Log in or create a new account on BlockTicket.xyz and go to My Wallet and select My Events to claim your ticket(s)`,
              messagingServiceSid: notificationsServiceSid,
              to: params.data.phoneNumberToUser,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNotificationsNumber,
            })
            .then(message => console.log(message.body))
            .catch(error => console.log('Twilio Transfer Notification Error ', error))
            .done()
        }

        // Changes on Order model
        if (event.model.singularName === 'order') {
          if (params.data.status === 'complete') {
            try {
              await strapi
                .plugin('email-designer')
                .service('email')
                .sendTemplatedEmail(
                  {
                    // required
                    to: result.users_permissions_user.email,
          
                    // optional if /config/plugins.js -> email.settings.defaultFrom is set
                    from: process.env.MAIN_EMAIL,
          
                    // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
                    replyTo: process.env.MAIN_EMAIL,
          
                    // optional array of files
                    attachments: [],
                  },
                  {
                    // required - Ref ID defined in the template designer (won't change on import)
                    templateReferenceId: 3,
          
                    // If provided here will override the template's subject.
                    // Can include variables like `Thank you for your order {{= USER.firstName }}!`
                    subject: `You Got Tickets To ${result.event.title}`,
                  },
                  {
                    // this object must include all variables you're using in your email template
                    event: result.event,
                    venue: result.event.venue,
                    address: result.event.venue.address,
                    tickets: result.tickets,
                    user: result.users_permissions_user,
                    total: result.total,
                    data: result
                  }
                );
            } catch (err) {
              strapi.log.debug('📺: ', err);
              return ctx.badRequest(null, err);
            }
          }

          if (params.data.status === 'completeFromTransfer') return
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

          if (process.env.NODE_ENV === 'test') return;

          if (process.env.NODE_ENV === 'development') {
            console.log(message);
            return
          }

          await client.messages
            .create({
              body: message,
              messagingServiceSid: messagingServiceSid,
              to: phoneNumber,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .catch(error => console.log('Twilio Role Notification Error ', error))
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
              username: event.params.data.email.toLowerCase()
            }
          })

          event.params.data.profile = profile
          event.params.data.email = event.params.data.email.toLowerCase()
          event.params.data.username = event.params.data.email.toLowerCase()
          event.params.data.firstName = event.params.data.firstName.toLowerCase()
          event.params.data.lastName = event.params.data.lastName.toLowerCase()
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

        // Changes on updateNumber
        if (event.model.singularName === 'update-number') {
          let code = Math.floor(1000 + Math.random() * 9000)
          event.params.data.code = code;
          console.log(`Use code ${code} to update your phone number to ${event.params.data.toNumber} `)
          if (process.env.NODE_ENV === 'development') return;
          await client.messages
            .create({
              body: `Use code ${code} to update your phone number to ${event.params.data.toNumber} `,
              messagingServiceSid: messagingServiceSid,
              to: event.params.data.toNumber,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .catch(error => console.log('Twilio Verification Error ', error))
            .done()
        }

        // Changes on verfiy model
        if (event.model.singularName === 'verify') {
          let phoneNumber = event.params.data.phoneNumber;
          let email = event.params.data.email;
          const account = await strapi.db.query('api::verify.verify').findOne({
            where: {
              $or: [
                { phoneNumber: phoneNumber },
                { email: email }
              ]
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

          if (process.env.NODE_ENV === 'development') {
            console.log(`${code} is your temporary verification code to login at BlockTickets.xyz`);
            return
          }
          
          if (event.params.data.phoneNumber) {
            await client.messages
            .create({
              body: `${code} is your temporary verification code to login at BlockTickets.xyz`,
              messagingServiceSid: messagingServiceSid,
              to: phoneNumber,
              from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
            })
            .then(message => console.log(message.body))
            .catch(error => console.log('Twilio Verification Error ', error))
            .done()
          }

          if (event.params.data.email) {
            try {
              await strapi
                .plugin('email-designer')
                .service('email')
                .sendTemplatedEmail(
                  {
                    // required
                    to: event.params.data.email,
          
                    // optional if /config/plugins.js -> email.settings.defaultFrom is set
                    from: process.env.MAIN_EMAIL,
          
                    // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
                    replyTo: process.env.MAIN_EMAIL,
          
                    // optional array of files
                    attachments: [],
                  },
                  {
                    // required - Ref ID defined in the template designer (won't change on import)
                    templateReferenceId: 1,
          
                    // If provided here will override the template's subject.
                    // Can include variables like `Thank you for your order {{= USER.firstName }}!`
                    subject: `Your temporary verification code to login at BlockTickets.xyz`,
                  },
                  {
                    // this object must include all variables you're using in your email template
                    code: code
                  }
                );
            } catch (err) {
              strapi.log.debug('📺: ', err);
              return ctx.badRequest(null, err);
            }
          }
        }
      },
      async beforeUpdate(event) {
        // Updates on payment-formation model
        if (event.model.singularName === 'payment-information') {
          if (!event.params.data.accountNumber) return
          await encryption
            .encrypt(event.params.data.accountNumber)
            .then(enc => {
              event.params.data.accountNumber = enc
            })
            .catch((err) => {
              console.error('Enc error: ', err)
            })
        }
      },
      async afterUpdate(event) {
        const { result, params } = event;
        if (event.model.singularName === 'order') {
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
             id: result.userId
            }
          })
          const events = await strapi.entityService.findOne('api::event.event', result.details.ticket.eventId, {
            populate: {
              image: true,
              venue: {
                populate: {
                  address: true
                }
              }
            }
          })

          if (params.data.status === 'complete') {
            try {
              await strapi
                .plugin('email-designer')
                .service('email')
                .sendTemplatedEmail(
                  {
                    // required
                    to: user.email,
          
                    // optional if /config/plugins.js -> email.settings.defaultFrom is set
                    from: process.env.MAIN_EMAIL,
          
                    // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
                    replyTo: process.env.MAIN_EMAIL,
          
                    // optional array of files
                    attachments: [],
                  },
                  {
                    // required - Ref ID defined in the template designer (won't change on import)
                    templateReferenceId: 3,
          
                    // If provided here will override the template's subject.
                    // Can include variables like `Thank you for your order {{= USER.firstName }}!`
                    subject: `You Got Tickets To ${events.name}`,
                  },
                  {
                    // this object must include all variables you're using in your email template
                    event: events,
                    venue: events.venue,
                    address: events.venue.address[0],
                    tickets: result.tickets,
                    user: user,
                    total: Number(result.total).toFixed(2),
                    count: result.details.ticketCount,
                    date: moment(events.start).format('ddd, MMM D, YYYY • h:mm'),
                    orderId: result.orderId,
                    image: events.image
                  }
                );
            } catch (err) {
              strapi.log.debug('📺: ', err);
               // return ctx.badRequest(null, err);
            }
          }
        }
      }
    });
  },
};
