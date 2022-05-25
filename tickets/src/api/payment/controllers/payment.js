'use strict';

const stripe = require('stripe')(process.env.STRIPE_KEY);


/**
 *  payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
  async getClientId(ctx) {  
    const ticket = ctx.request.body.ticket

    const ticketCount = ctx.request.body.ticketCount
    let user = ctx.state.user;
    let totalTicketPrices = Number(parseFloat(ticket.attributes ? ticket.attributes.cost : ticket.cost * ticketCount).toFixed(2))
    let fees = Number(parseFloat((ticket.attributes ? ticket.attributes.fee : ticket.fee  * ticketCount) + (ticket.attributes ?  ticket.attributes.facilityFee : ticket.facilityFee * ticketCount) + 4.35 + 2.50).toFixed(2))
    let total = (totalTicketPrices + fees)
    let stripePriceConversion = (total * 100).toFixed()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripePriceConversion,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        ticketType: ticket.attributes ? ticket.attributes.generalAdmission : ticket.generalAdmission ? 'General Admission Ticket' : 'Seated Ticket',
        ticketName: ticket.attributes ? ticket.attributes.name : ticket.name,
        ticketPrice: ticket.attributes ? ticket.attributes.cost : ticket.cost,
        eventId: ticket.attributes ? ticket.attributes.eventId : ticket.eventId,
        ticketCount: ticketCount,
        userId: user.id
      }
    });

    return paymentIntent
  }
}));
