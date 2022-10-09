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
    let event;
    
    if (listing) {
      event = await strapi.db.query('api::event.event').findOne({
        where: { uuid: listing.event.uuid },
        populate: { 
          fee_structure: true,
          venue: {
            populate: {
              address: true
            }
          } 
        },
      });
  
      let taxRates = await strapi.db.query('api::sales-tax.sales-tax').findOne({
        where: {
          abbreviation: {
            $eq: event.venue.address[0].state.toLowerCase()
          }
        },
        populate: { 
          sales_tax_rates: {
            where: {
              city: {
                $eq: event.venue.address[0].city.toLowerCase()
              }
            }
          }
        },
      });

      let hash = {}
      hash['serviceFees'] = (event.fee_structure.secondaryServiceFeeBuyer / 100) * parseFloat(listing.askingPrice);
      hash['paymentProcessingFee'] = (((parseFloat(event.fee_structure.stripeServicePecentage) * parseFloat(listing.askingPrice)) / 100) + event.fee_structure.stripeCharge).toFixed(2);
      hash['paymentProcessingFee'] = parseFloat(hash['paymentProcessingFee'])
      hash['facilityFee'] = 0
      hash['ticketPrice'] = parseFloat(listing.askingPrice);
      hash['tax'] = (taxRates.sales_tax_rates.find(r => r.city == event.venue.address[0].city.toLowerCase()).combinedTaxRate / 100) * hash['ticketPrice']
      // Fee Totals
      let feeTotals = parseFloat(hash.serviceFees) + parseFloat(hash.paymentProcessingFee) + parseFloat(hash.facilityFee) + parseFloat(hash.tax) 
      // per ticket
      feeTotals = parseFloat(feeTotals).toFixed(2)
      let total = parseFloat(hash['ticketPrice']) + parseFloat(feeTotals)

      let stripePriceConversion = (total * 100).toFixed()

      paymentIntent = await stripe.paymentIntents.create({
        amount: stripePriceConversion,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          ticketType: listing.tickets[0].generalAdmission ? 'General Admission Ticket' : 'Seated Ticket',
          ticketName: listing.tickets[0].name,
          ticketPrice: listing.askingPrice,
          eventId: listing.event.id,
          ticketCount: listing.tickets.length,
          userId: user.id,
          listing: listing.id
        }
      });
    } else if (ticket) {
      event = await strapi.db.query('api::event.event').findOne({
        where: { uuid: ticket.eventId },
        populate: { 
          fee_structure: true,
          venue: {
            populate: {
              address: true
            }
          } 
        },
      });
  
      let taxRates = await strapi.db.query('api::sales-tax.sales-tax').findOne({
        where: {
          abbreviation: {
            $eq: event.venue.address[0].state.toLowerCase()
          }
        },
        populate: { 
          sales_tax_rates: {
            where: {
              city: {
                $eq: event.venue.address[0].city.toLowerCase()
              }
            }
          }
        },
      });

      let hash = {}
      if (parseInt(ticket.cost) < 20) hash['serviceFees'] = 1;
      if (parseInt(ticket.cost) >= 20) hash['serviceFees'] = (event.fee_structure.primaryOver20 / 100) * parseFloat(ticket.cost);
      if (parseFloat(ticket.cost)) hash['paymentProcessingFee'] = (((parseFloat(event.fee_structure.stripeServicePecentage) * parseFloat(ticket.cost)) / 100) + event.fee_structure.stripeCharge).toFixed(2);
      hash['paymentProcessingFee'] = parseFloat(hash['paymentProcessingFee'])
      hash['facilityFee'] = parseFloat(ticket.fee)
      hash['ticketPrice'] = parseFloat(ticket.cost);
      hash['tax'] = (taxRates.sales_tax_rates.find(r => r.city == event.venue.address[0].city.toLowerCase()).combinedTaxRate / 100) * hash['ticketPrice']
      // Fee Totals
      let feeTotals = parseFloat(hash.serviceFees) + parseFloat(hash.paymentProcessingFee) + parseFloat(hash.facilityFee) + parseFloat(hash.tax) 
      // per ticket
      feeTotals = parseFloat(feeTotals * ticketCount).toFixed(2)
      let total = parseFloat(hash['ticketPrice'] * ticketCount) + parseFloat(feeTotals)

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
