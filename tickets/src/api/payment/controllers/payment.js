'use strict';

const stripe = require('stripe')(process.env.STRIPE_KEY);


/**
 *  payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
  async getClientId(ctx) {
    const total = ctx.params.total

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return paymentIntent
  }
}));
