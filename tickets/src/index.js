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

      const orgPermissionCount = await strapi.db.query('api::organization-permission.organization-permission').count()

      if (orgPermissionCount === 0) {
        const permissions = [
          {
              key: "settings",
              name: "Edit organization info"
          },
          {
            key: "settings",
              name: "Edit roles & add team members"
          },
          {
              key: "settings",
              name: "Edit payment information"
          },
          {
              key: "settings",
              name: "View payouts"
          },
          {
              key: "settings",
              name: "Edit tax status"
          },
          {
              key: "management",
              name: "Create / edit an event"
          },
          {
            key: "management",
              name: "View dashboard"
          },
          {
            key: "management",
              name: "View orders"
          },
          {
            key: "management",
              name: "Issue refunds"
          },
          {
            key: "management",
              name: "Edit & add guest list"
          },
          {
            key: "management",
              name: "Attendees (check in)"
          },
          {
            key: "management",
              name: "Edit & add tracking links"
          }
        ];

        permissions.map(async (permission) => {
          await strapi.db.query('api::organization-permission.organization-permission').create({
            data: {
              name: permission.name,
              key: permission.key
            }
          })
        })
      }

      const salesTaxCount = await strapi.db.query('api::sales-tax.sales-tax').count()

      if (salesTaxCount === 0) {
        let taxRates = [
          {state: 'texas', city: 'dallas', stateTaxRate: 6.25, localTaxRate: 2.0, combinedTaxRate: 8.25, abbreviation: 'tx' },
          {state: 'texas', city: 'san antonio', stateTaxRate: 6.25, localTaxRate: 2.0, combinedTaxRate: 8.25, abbreviation: 'tx'  },
          {state: 'texas', city: 'houston', stateTaxRate: 6.25, localTaxRate: 0, combinedTaxRate: 6.25, abbreviation: 'tx'  },
          {state: 'north carolina', city: 'raleigh', stateTaxRate: 4.75, localTaxRate: .25, combinedTaxRate: 5.0, abbreviation: 'nc'  },
          {state: 'connecticut', city: 'all', stateTaxRate: 6.35, localTaxRate: 0, combinedTaxRate: 6.35, abbreviation: 'ct'  },
          {state: 'delaware', city: 'all', stateTaxRate: 0, localTaxRate: 0, combinedTaxRate: 0, abbreviation: 'de'  },
          {state: 'district of columbia', city: 'washington', stateTaxRate: 6.0, localTaxRate: 0, combinedTaxRate: 6.0, abbreviation: 'dc'  },
          {state: 'indiana', city: 'all', stateTaxRate: 7.0, localTaxRate: 0, combinedTaxRate: 7.0, abbreviation: 'in'  },
          {state: 'maryland', city: 'all', stateTaxRate: 6.0, localTaxRate: 0, combinedTaxRate: 6.0, abbreviation: 'md'  },
        ]

        
        for await(let rate of taxRates) {
          let str = await strapi.db.query('api::sales-tax-rate.sales-tax-rate').create({
            data: {
              state: rate.state, city: rate.city, stateTaxRate: rate.stateTaxRate, localTaxRate:rate.localTaxRate, combinedTaxRate: rate.combinedTaxRate
            },
          });

          let st = await strapi.db.query('api::sales-tax.sales-tax').findOne({
            where: { state: rate.state.toLowerCase() },
            populate: {
              sales_tax_rates: true
            }
          });

          if (!st) {
            let st = await strapi.db.query('api::sales-tax.sales-tax').create({
              data: {
                state: rate.state.toLowerCase(),
                abbreviation: rate.abbreviation.toLowerCase(),
                sales_tax_rates: str
              },
              populate: {
                sales_tax_rates: true
              }
            });
          } else {
            await strapi.db.query('api::sales-tax.sales-tax').update({
              where: { id: st.id },
              data: {
                sales_tax_rates: [...st.sales_tax_rates, str],
              },
            });
          }
        }
      }

      if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "preview") {

        const hasUser = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            email: {
              $eq: 'staff@blocktickets.xyz'
            },
          },
        })

        if (hasUser) { console.log('Found User'); return }

        const role = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: {
            name: 'Organizer'
          }
        })

        const userObj = {
          data: {
            username: 'blocktickets',
            email: 'staff@blocktickets.xyz',
            phoneNumber: '+12024509090',
            firstName: 'Block',
            lastName: 'Mafia',
            gender: 'other',
            role,
            confirmed: true,
            password: 'blocktickets'
          }
        }

        let user = await strapi.service('api::verify.verify').createUser(userObj)

        const org = await strapi.db.query('api::organization.organization').findOne({
          where: { name: 'BlockTickets' },
          populate: { members: true },
        });

        if (org.members.length === 0) {
          await strapi.db.query('api::organization.organization').update({
            where: { name: 'BlockTickets' },
            data: {
              members: [user],
            },
          });
        }
      }
    }

    initOrganization()
    initCategories()
    
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user', 'api::profile.profile', 'api::verify.verify', 'api::invite.invite', 'api::organization.organization',
                'api::venue.venue', 'api::event.event', 'api::order.order', 'api::ticket-transfer.ticket-transfer', 'api::payment-information.payment-information',
                'api::update-number.update-number', 'api::listing.listing', 'api::invite-team-member.invite-team-member'],
      async afterCreate(event) {
        // afterCreate lifecycle
        const {
          result,
          params
        } = event;

        // Changes on Invite
        if (event.model.singularName === 'invite-team-member') {
          // Doesnt work
          if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').sendMemberInvite(params);
        }

        // Changes on Organization
        if (event.model.singularName === 'organization') {
          let orgPermissions = await strapi.entityService.findMany('api::organization-permission.organization-permission');

          let role = await strapi.db.query('api::organization-role.organization-role').create({
            data: {
              name: 'Admin',
              organization: result.id,
              organization_permissions: [...orgPermissions]
            }
          })

          const org = await strapi.entityService.findOne('api::organization.organization', result.id, {
            populate: { members: true },
          }); 

          if (org.members.length === 1) {
            let admin = org.members[0]
            await strapi.entityService.update('plugin::users-permissions.user', admin.id, {
              data: {
                organization_role: role.id,
              },
            }); 
          }
        }

        // Changes on ticket transer
        if (event.model.singularName === 'ticket-transfer') {
          // dont send SMS when running test
          if (process.env.NODE_ENV === 'test') return;

          if (process.env.NODE_ENV === 'development') {
            console.log(`${params.data.fromUser.firstName} ${params.data.fromUser.lastName} is sending you ticket(s) to ${params.data.event.name}. To Accept: https://blocktickets.xyz`);
            return
          }

          strapi.service('api::notification.notification').transferTickets(params);
        }

        // Changes on Order model
        if (event.model.singularName === 'order') {
          if (params.data.status === 'completeFromTransfer' || event.params.data.paymentIntentId === "0") return
          const paymentIntent = await stripe.paymentIntents.update(
            event.params.data.paymentIntentId,
            { metadata: {order_id: result.id }}
          );
        }

        // Changes on Payment-information model
        if (event.model.singularName === 'payment-information') {
          let data = event.params.data;
          let resultId = result.id;

          // await encryption
          //   .decrypt(result.accountNumber)
          //   .then((text) => {
          //     result.accountNumber = text
          //   })
          //   .catch((err) => {
          //     // This is to handle errors
          //   })

          // const account = await stripe.accounts.create({
          //   type: 'custom',
          //   business_type: 'individual',
          //   country: 'US',
          //   email: data.user.email,
          //   capabilities: {
          //     card_payments: {requested: true},
          //     transfers: {requested: true},
          //     us_bank_account_ach_payments: {requested: true}
          //   },
          //   individual: {
          //     first_name: data.user.firstName,
          //     last_name: data.user.lastName,
          //     email: data.user.email
          //   },
          //   business_profile: {
          //     product_description: 'Ticket Purchase'
          //   }
          // });

          // const bankAccount = await stripe.accounts.createExternalAccount(
          //   account.id,
          //   {
          //     external_account: {
          //       country: 'US',
          //       currency: 'usd',
          //       // bank_name: result.accountName,
          //       account_holder_name: `${data.user.firstName} ${data.user.lastName}`,
          //       account_holder_type: 'individual',
          //       routing_number: result.routingNumber,
          //       // last4: result.accountNumber.substr(result.accountNumber.length - 4),
          //       object: 'bank_account'
          //     }
          //   }
          // );

          // await strapi.db.query('api::payment-information.payment-information').update({
          //   where: {
          //     id: resultId
          //   },
          //   data: {
          //     stripeConnectedAccount: account,
          //   }
          // })

          // await stripe.accounts.update(
          //   account.id,
          //   {tos_acceptance: {date: Math.round(Date.now() / 1000), ip: data.ip}}
          // );
        }
        
        // Changes on venue
        if (event.model.singularName === 'venue') {
          const address = result.address[0];
          const address1 = address.address_1;
          const address2 = address.address_2;
          const city = address.city;
          const state = address.state;
          const query = `${address1},${city},${state}&key=${geoApiKey}`;
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

          if (!geometry) return;

          await strapi.entityService.update('api::venue.venue', result.id, {
            data: {
              address: [{
                id: result.address[0].id, // will update component with id: 1 (if not specified, would have deleted it and created a new one)
                address_1: result.address[0].address_1,
                address_2: result.address[0].address_2,
                city: result.address[0].city,
                state: result.address[0].state,
                latitude: String(geometry?.location.lat),
                longitude: String(geometry?.location.lng)
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
            message = `You've been granted ${role} access in blocktickets.xyz.  You may create or edit Organization information which your a member of.`
          } else {
            message = `You've been added to the ${organization.name} organization at blocktickets.xyz`;
          }

          if (process.env.NODE_ENV === 'test') return;

          if (process.env.NODE_ENV === 'development') {
            console.log(message);
            return
          }

          await client.messages
            .create({
              body: message,
              messagingServiceSid: notificationsServiceSid,
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

        // Changes on Invite
        if (event.model.singularName === 'invite-team-member') {
          let code = await strapi.service('api::utility.utility').generateCode();
          event.params.data.inviteCode = code
        }

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

        // Changes on listing model
        if (event.model.singularName === 'invite-team-member') {
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on listing model
        if (event.model.singularName === 'listing') {
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on ticket model
        if (event.model.singularName === 'ticket') {
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on Order model
        if (event.model.singularName === 'order') {
          event.params.data.orderId = orderId.generate();
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on Organization model
        if (event.model.singularName === 'organization') {
          event.params.data.uuid =  await strapi.service('api::utility.utility').generateUUID();
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
          const venue = await strapi.db.query('api::venue.venue').findOne({
            where: {
              id: event.params.data.venue
            }
          })

          const feeStructure = await strapi.db.query('api::fee-structure.fee-structure').create({
            data: {
              stripeServicePecentage: 2.9,
              stripeCharge: .30,
              primaryUnder20: 1,
              primaryOver20: 5,
              secondaryServiceFeeSeller: 15,
              secondaryServiceFeeBuyer: 10
            }
          })

          event.params.data.venue = venue.id
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
          event.params.data.fee_structure = feeStructure.id
        }

        // Changes on Venue model
        if (event.model.singularName === 'venue') {
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on Category model
        if (event.model.singularName === 'category') {
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
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
          // event.params.data.gender = event.params.data.gender.toLowerCase()
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID()
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
          event.params.data.uuid = await strapi.service('api::utility.utility').generateUUID();
        }

        // Changes on updateNumber
        if (event.model.singularName === 'update-number') {
          let code = await strapi.service('api::utility.utility').generateCode();
          event.params.data.code = code;
          console.log(`Use code ${code} to update your phone number to ${event.params.data.toNumber} `)
          if (process.env.NODE_ENV === 'development') return;
          await client.messages
            .create({
              body: `Use code ${code} to update your phone number to ${event.params.data.toNumber} `,
              messagingServiceSid: notificationsServiceSid,
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
            console.log(`Blocktickets: ${code} is your verification code. Code expires in 5 minutes. Do not share with anyone.`);
            return
          }
          
          if (event.params.data.phoneNumber) {
            strapi.service('api::notification.notification').loginNotification(code, phoneNumber)
          }

          if (event.params.data.email) {
            if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').sendAccessCode(event, code);
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
        // Updates on Order
        if (event.model.singularName === 'order') {
          event.state = event.params;
        }
      },
      async afterUpdateMany(event) {
        const { result, params, state } = event;
      }
    });
  },
};
