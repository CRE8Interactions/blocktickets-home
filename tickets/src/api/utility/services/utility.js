'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * utility service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::utility.utility', ({ strapi }) => ({
  async calculateTicketPrices(ticket = null, listing = null, showFees = true, taxRates, feeStructure) {
    if (ticket) {
      let prices = {}
      // console.log(ticket)
      // prices['ticketCost'] = ticket?.attributes ? parseFloat(ticket?.attributes?.cost) : parseFloat(ticket?.cost);
      // if (parseInt(prices['ticketCost']) < 20) prices['serviceFees'] = 1;
      // if (parseInt(prices['ticketCost']) >= 20) prices['serviceFees'] = (feeStructure?.primaryOver20 / 100) * prices['ticketCost'];
      // if (parseFloat(prices['ticketCost'])) prices['paymentProcessingFee'] = (((parseFloat(feeStructure?.stripeServicePecentage) * parseFloat(prices['ticketCost'])) / 100) + feeStructure?.stripeCharge).toFixed(2);
      // prices['paymentProcessingFee'] = parseFloat(prices['paymentProcessingFee'])
      // prices['ticketServiceFee'] = prices['serviceFees'];
      // prices['ticketFacilityFee'] = ticket?.attributes ? ticket?.attributes?.fee : ticket.fee;
      // prices['tax'] = (taxRates?.combinedTaxRate / 100) * parseFloat(prices['ticketCost']);
      // prices['tax'] = Number(parseFloat(prices['tax']).toFixed(2));
      // prices['totalFees'] = prices.ticketCost == 0 ? 0 : parseFloat(prices['serviceFees']) + parseFloat(prices['ticketFacilityFee']) + parseFloat(prices.paymentProcessingFee);
      // prices['totalFees'] = Number(parseFloat(prices['totalFees']).toFixed(2))
      // prices['ticketType'] = ticket?.attributes ? ticket?.attributes?.resale ? 'Resale Ticket' : 'Standard Ticket' : ticket?.resale ? 'Resale Ticket' : 'Standard Ticket';
      // prices['ticketCostWithFees'] = parseFloat(prices['ticketCost']) + parseFloat(prices['ticketServiceFee']) + parseFloat(prices['ticketFacilityFee']) + parseFloat(prices['paymentProcessingFee']) + parseFloat(prices['tax']);
      // prices['ticketCostWithFees'] = Number(parseFloat(prices['ticketCostWithFees']).toFixed(2))
      // prices['ticketName'] = ticket?.attributes ? ticket?.attributes?.name : ticket?.name;
      // prices['buyerTotal'] = prices['ticketCostWithFees']
      // prices['ticketCount'] = 1;
      // prices['listing'] = false;

      prices['ticketCost'] = ticket?.attributes ? parseFloat(ticket?.attributes?.cost) : parseFloat(ticket?.cost);
      prices['ticketName'] = ticket?.attributes ? ticket?.attributes?.name.trim() : ticket?.name.trim();
      if (parseInt(prices['ticketCost']) < 20) prices['serviceFees'] = 1;
      if (parseInt(prices['ticketCost']) >= 20) prices['serviceFees'] = (feeStructure?.primaryOver20 / 100) * prices['ticketCost'];
      prices['ticketFacilityFee'] = ticket?.attributes ? ticket?.attributes?.fee : ticket.fee;
      prices['ticketCostWithFees'] = prices['ticketCost'] > 0 ? prices.ticketCost + prices.serviceFees + prices.ticketFacilityFee : 0;
      prices['taxPerTicket'] = prices['ticketCost'] > 0 ? Number(((taxRates?.combinedTaxRate / 100) * prices.ticketCostWithFees).toFixed(2)) : 0;
      if (prices['ticketCost'] > 0) prices['paymentProcessingFee'] = Number((((prices.ticketCostWithFees * feeStructure?.stripeServicePecentage) / 100) + feeStructure?.stripeCharge).toFixed(2));
      prices['ticketCostWithFeesAndTax'] = prices['ticketCost'] > 0 ? (prices.ticketCost + prices.serviceFees + prices.ticketFacilityFee + prices.taxPerTicket + prices.paymentProcessingFee).toFixed(2) : 0;
      prices['totalFees'] = prices['ticketCost'] > 0 ? Number((prices.serviceFees + prices.ticketFacilityFee + prices.taxPerTicket + prices.paymentProcessingFee).toFixed(2)) : 0;
      prices['feesWithoutTax'] = prices['ticketCost'] > 0 ? Number((prices.serviceFees + prices.ticketFacilityFee + prices.paymentProcessingFee).toFixed(2)) : 0;
      prices['listing'] = false;
      prices['ticketType'] = ticket?.attributes ? ticket?.attributes?.resale ? 'Resale Ticket' : 'Standard Ticket' : ticket?.resale ? 'Resale Ticket' : 'Standard Ticket';
      return prices;
  }
  if (listing) {
      let prices = {}
      prices['ticketCost'] = (listing.askingPrice);
      prices['listingTotal'] = parseFloat(listing.total);

      prices['serviceFees'] = (feeStructure?.primaryOver20 / 100) * prices.ticketCost;
      prices['ticketFacilityFee'] = 0;
      prices['ticketCostWithFees'] = prices.ticketCost + prices.serviceFees;
      prices['taxPerTicket'] = Number(((taxRates?.combinedTaxRate / 100) * prices.ticketCostWithFees).toFixed(2));
      prices['paymentProcessingFee'] = Number((((prices.ticketCostWithFees * feeStructure?.stripeServicePecentage) / 100) + feeStructure?.stripeCharge).toFixed(2));
      prices['ticketCostWithFeesAndTax'] = Number((prices.ticketCost + prices.serviceFees + prices.taxPerTicket + prices.paymentProcessingFee).toFixed(2));
      prices['totalFees'] = Number((prices.serviceFees + prices.taxPerTicket + prices.paymentProcessingFee).toFixed(2));
      prices['feesWithoutTax'] = Number((prices.serviceFees + prices.ticketFacilityFee + prices.paymentProcessingFee).toFixed(2));
      prices['listing'] = true;
      prices['ticketType'] = listing.tickets[0]?.resale ? 'Resale Ticket' : 'Standard Ticket';
      prices['listingTotalWithFees'] = Number((prices['ticketCostWithFeesAndTax'] * listing.quantity).toFixed(2));
      prices['ticketName'] = listing.tickets.length > 0 ? listing.tickets[0]?.name : '';

      console.log(prices)
      // prices['paymentProcessingFee'] = (((parseFloat(feeStructure?.stripeServicePecentage) * prices['listingTotal']) / 100) + feeStructure?.stripeCharge).toFixed(2)
      
      // prices['paymentProcessingFee'] = Number(((((prices.listingTotal) / listing.quantity) * feeStructure?.stripeServicePecentage) / 100) + feeStructure?.stripeCharge).toFixed(2);
      // prices['ticketFacilityFee'] = 0;
      // prices['taxPerTicket'] = Number(parseFloat((taxRates?.combinedTaxRate / 100) * (prices.listingTotal / listing.quantity)).toFixed(2));
      // prices['totalFees'] = parseFloat(prices['ticketServiceFee']) + prices['paymentProcessingFee'] + parseFloat(prices.taxPerTicket)
      // prices['ticketType'] = listing.tickets[0]?.resale ? 'Resale Ticket' : 'Standard Ticket';
      // prices['ticketCostWithFees'] = parseFloat(prices.listingTotal / listing.quantity) + parseFloat(prices.totalFees);

      // prices['feesPerTicket'] =  Number((parseFloat(prices.totalFees) / listing.quantity).toFixed(2));
      // prices['ticketName'] = listing.tickets.length > 0 ? listing.tickets[0]?.name : '';
      // prices['ticketCount'] = listing.tickets.length;
      // prices['listing'] = true;
      // prices['listingTotalWithFees'] = prices['listingTotal'] + prices['totalFees'];
      return prices;
  }
  },
  async generateUUID() {
    return uuidv4();
  },
  async generateCode() {
    return Math.floor(1000 + Math.random() * 9000)
  },
  async generatePromoCode() {
    return Math.floor(100000 + Math.random() * 900000)
  },
  async refreshDB() {
    await strapi.db.query('api::ticket.ticket').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::organization.organization').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
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

    await strapi.db.query('api::history.history').deleteMany({
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

    await strapi.db.query('api::tracking.tracking').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::wallet.wallet').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::profile.profile').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('plugin::users-permissions.user').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::page-view.page-view').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::organization-role.organization-role').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::w9.w9').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::invite-team-member.invite-team-member').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::event.event').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::promo.promo').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::promo-sale.promo-sale').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::promo-view.promo-view').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::invite.invite').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });

    await strapi.db.query('api::organization-payment-information.organization-payment-information').deleteMany({
      where: {
        createdAt: {
          $lte: new Date()
        },
      },
    });
  } 
}));