'use strict';
const Web3API = require('web3');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsNumber = process.env.SMS_NUMBER;
const client = require('twilio')(accountSid, authToken);
const blockchain = process.env.BLOCKCHAIN;
const messagingServiceSid = process.env.MG80e1372892690914b598b6478a992c1a;
const myPhone = process.env.TWILIO_PHONE

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {

    let initCategories = async() => {
      const count = await strapi.db.query('api::category.category').count()
      console.log(count)
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

    initCategories()

    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user', 'api::profile.profile', 'api::verify.verify'],
      async afterCreate(event) {
        // afterCreate lifeclcyle
      },
      async beforeCreate(event) {
        // beforeCreate lifeclcyle
        // Changes on user model
        if (event.model.singularName === 'user') {
          const profile = await strapi.db.query('api::profile.profile').create({
            data: {
              username: event.params.data.username.toLowerCase()
            }
          })
          event.params.data.profile = profile
          event.params.data.email = event.params.data.email.toLowerCase()
          event.params.data.username = event.params.data.username.toLowerCase()
        }

        // Changes on profile model
        if (event.model.singularName === 'profile') {
          const web3 = await new Web3API(new Web3API.providers.HttpProvider(blockchain));
          const account = await web3.eth.accounts.create(web3.utils.randomHex(32));
          const wallet = await  web3.eth.accounts.wallet.add(account)

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
            where: { phoneNumber: phoneNumber }
           })
          if (account) {
            await strapi.db.query('api::verify.verify').delete({
              where: { id: account.id }
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
    });
  },
};
