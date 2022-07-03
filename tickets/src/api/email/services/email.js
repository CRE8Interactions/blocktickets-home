'use strict';

const moment = require('moment');

// Encrypts user data
const options = {
  password: process.env.EC_PASSWORD || 'blocktickets',
  passwordSalt: process.env.DEFAULT_PW
};
const encryption = require('encryption-se')(options);

/**
 * email service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email.email', ({ strapi }) => ({
  async removeListing(user, listing) {
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
            templateReferenceId: 16,
  
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            subject: `Your listing has been removed!`,
          },
          {
            // this object must include all variables you're using in your email template
            user: user,
            event: listing.event,
            date: moment(listing.event.start).format('ddd, MMM D, YYYY • h:mm'),
            quantity: listing.quantity
          }
        );
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  },
  async listingSold(user, order, listing, ticketUpdates) {
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
            templateReferenceId: 10,
  
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            subject: `Great news, you have sold tickets!`,
          },
          {
            // this object must include all variables you're using in your email template
            user: user,
            event: order.event,
            date: moment(order.event.start).format('ddd, MMM D, YYYY • h:mm'),
            quantity: listing.quantity,
            askingPrice: listing.askingPrice,
            total: (listing.askingPrice * listing.quantity),
            serviceFees: (listing.serviceFees / listing.quantity),
            serviceFeesTotal: listing.serviceFees,
            payout: listing.payout
          }
        );
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  },
  async listingActive(user, tickets, event, serviceFees, payout, quantity, askingPrice) {
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
            templateReferenceId: 9,
  
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            subject: `You just listed tickets for sale!`,
          },
          {
            // this object must include all variables you're using in your email template
            user: user,
            event: event,
            date: moment(event.start).format('ddd, MMM D, YYYY • h:mm'),
            quantity: quantity,
            askingPrice: askingPrice,
            total: (askingPrice * quantity),
            serviceFees: (serviceFees / quantity),
            serviceFeesTotal: serviceFees,
            payout: payout
          }
        );
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  },
  async personalDetailsUpdate(user) {
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
            templateReferenceId: 17,
  
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            subject: `You have updated your personal details!`,
          },
          {
            // this object must include all variables you're using in your email template
            user: user
          }
        );
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  },
  async phoneUpdate(phone, user) {
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
            templateReferenceId: 18,
  
            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            subject: `You have updated your phone number!`,
          },
          {
            // this object must include all variables you're using in your email template
            user: user,
            phoneNumber: phoneNumber,
          }
        );
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  },
  async updatePaymentAccount(data, user) {
    let accountNumber = await encryption
      .decrypt(data.accountNumber);
    
      accountNumber = accountNumber.slice(accountNumber.length - 4);

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
              templateReferenceId: 20,
    
              // If provided here will override the template's subject.
              // Can include variables like `Thank you for your order {{= USER.firstName }}!`
              subject: `Your bank account has been updated!`,
            },
            {
              // this object must include all variables you're using in your email template
              user: user,
              accountNumber: `XXXXX${accountNumber}`,
              bank: data.accountName,
              accountType: data.accountType
            }
          );
      } catch (err) {
        strapi.log.debug('📺: ', err);
      }
  },
  async sendPaymentAccount(data, user) {
    let accountNumber = await encryption
      .decrypt(data.payment_information.accountNumber);
    
      accountNumber = accountNumber.slice(accountNumber.length - 4);
    
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
              templateReferenceId: 19,
    
              // If provided here will override the template's subject.
              // Can include variables like `Thank you for your order {{= USER.firstName }}!`
              subject: `Your bank account has been linked!`,
            },
            {
              // this object must include all variables you're using in your email template
              user: user,
              accountNumber: `XXXXX${accountNumber}`,
              bank: data.payment_information.accountName,
              accountType: data.payment_information.accountType
            }
          );
      } catch (err) {
        strapi.log.debug('📺: ', err);
      }
  },
  async sendAccessCode(event, code) {
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
    }
  },
  async orderNotification(order) {
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: order.userId
      }
    })

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
            subject: `You Got Tickets To ${order.event.name}`,
          },
          {
            // this object must include all variables you're using in your email template
            event: order.event,
            venue: order.event.venue,
            address: order.event.venue.address[0],
            tickets: order.tickets,
            user: user,
            total: Number(order.total).toFixed(2),
            count: order.details.ticketCount,
            date: moment(order.event.start).format('ddd, MMM D, YYYY • h:mm'),
            orderId: order.orderId,
            image: order.event.image
          }
        );
        //
    } catch (err) {
      strapi.log.debug('📺: ', err);
    }
  }
}))
