'use strict';

const stripe = require('stripe')(process.env.STRIPE_KEY);


/**
 *  payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
  async getClientId(ctx) {  
    const ticket = ctx.request.body.ticket;
    const listing = ctx.request.body.listing;
    const ticketCount = ctx.request.body.ticketCount
    let paymentIntent;
    let user = ctx.state.user;

    if (listing) {
      let totalTicketPrices = listing.askingPrice + listing.tickets.map(ticket => ticket.fee).reduce((a, b) => a + b) + listing.tickets.map(ticket => ticket.facilityFee).reduce((a, b) => a + b) + 2.5 + 4.35;
      let stripePriceConversion = (totalTicketPrices * 100).toFixed()

      paymentIntent = await stripe.paymentIntents.create({
        amount: stripePriceConversion,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          ticketType: listing.tickets[0].generalAdmission ? 'General Admission Ticket' : 'Seated Ticket',
          ticketName: listing.tickets[0].name,
          ticketPrice: totalTicketPrices,
          eventId: listing.event.id,
          ticketCount: listing.tickets.length,
          userId: user.id,
          listing: listing.id
        }
      });
    } else if (ticket) {
      let totalTicketPrices = Number(parseFloat(ticket.attributes ? ticket.attributes.cost : ticket.cost * ticketCount).toFixed(2))
      let fees = Number(parseFloat((ticket.attributes ? ticket.attributes.fee : ticket.fee  * ticketCount) + (ticket.attributes ?  ticket.attributes.facilityFee : ticket.facilityFee * ticketCount) + 4.35 + 2.50).toFixed(2))
      let total = (totalTicketPrices + fees)
      let stripePriceConversion = (total * 100).toFixed()

      paymentIntent = await stripe.paymentIntents.create({
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
    }
  
    return paymentIntent
  }
}));
