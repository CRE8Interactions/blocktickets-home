'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    let user = ctx.state.user;
    let cart = ctx.request.body.cart;
    let paymentIntentId = ctx.request.body.paymentIntentId;
    let tickets;
    let totalTicketPrices;
    let fees;
    let total;
    let eventId;
    let gross;
    let event;
    
    // Find Available Tickets
    if (cart.ticket) {
      eventId = cart.ticket.eventId

      tickets = await strapi.db.query('api::ticket.ticket').findMany({
        where: {
          $and: [
             { eventId: { $eq: cart.ticket.eventId}},
             { on_sale_status: { $eq: "available" }},
             { name: { $eq: cart.ticket.name }}

          ]
        },
        limit: cart.ticketCount
      })

      if (tickets.length < cart.ticketCount) {
        return ctx.badRequest('Tickets not available', { message: `There are only ${tickets.length} tickets available`})
      }
    } else if (cart.listing) {
      eventId = cart.listing.event.uuid

      tickets = await strapi.db.query('api::ticket.ticket').findMany({
        where: {
          eventId: eventId,
          id: { $eq: cart.listing.tickets.map(ticket => ticket.id) }
        }
      })
    }

    event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: eventId },
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

    if (cart.ticket) {
      let hash = {}
      // Calculate Fees
      if (parseInt(cart.ticket.cost) < 20) hash['serviceFees'] = 1;
      if (parseInt(cart.ticket.cost) >= 20) hash['serviceFees'] = (event.fee_structure.primaryOver20 / 100) * parseFloat(cart.ticket.cost);
      if (parseFloat(cart.ticket.cost)) hash['paymentProcessingFee'] = (((parseFloat(event.fee_structure.stripeServicePecentage) * parseFloat(cart.ticket.cost)) / 100) + event.fee_structure.stripeCharge).toFixed(2);
      hash['paymentProcessingFee'] = parseFloat(hash['paymentProcessingFee'])
      hash['facilityFee'] = parseFloat(cart.ticket.fee)
      hash['ticketPrice'] = parseFloat(cart.ticket.cost);
      hash['tax'] = (taxRates.sales_tax_rates.find(r => r.city == event.venue.address[0].city.toLowerCase()).combinedTaxRate / 100) * hash['ticketPrice']
      // Fee Totals
      let feeTotals = parseFloat(hash.serviceFees) + parseFloat(hash.paymentProcessingFee) + parseFloat(hash.facilityFee) + parseFloat(hash.tax) 
      // per ticket
      feeTotals = parseFloat(feeTotals * cart.ticketCount).toFixed(2)
      gross = (parseFloat(hash['ticketPrice']).toFixed(2) * cart.ticketCount) + (parseFloat(hash['facilityFee']).toFixed(2) * cart.ticketCount)
      total = parseFloat(hash['ticketPrice'] * cart.ticketCount) + parseFloat(feeTotals)
      cart['feeDetails'] = hash
    } else if (cart.listing) {
      let hash = {}
      // Calculate Fees
      hash['ticketPrice'] = parseFloat(cart.listing.askingPrice).toFixed(2);
      hash['serviceFees'] = (event.fee_structure.secondaryServiceFeeBuyer / 100) * parseFloat(cart.listing.askingPrice);
      hash['paymentProcessingFee'] = (((parseFloat(event.fee_structure.stripeServicePecentage) * parseFloat(cart.listing.askingPrice)) / 100) + event.fee_structure.stripeCharge).toFixed(2);
      hash['tax'] = (taxRates.sales_tax_rates.find(r => r.city == event.venue.address[0].city.toLowerCase()).combinedTaxRate / 100) * hash['ticketPrice']
      total = parseFloat(hash['ticketPrice']) + parseFloat(hash['serviceFees']) + parseFloat(hash['paymentProcessingFee']) + parseFloat(hash['tax'])
      gross = parseFloat(hash['ticketPrice'])
      cart['feeDetails'] = hash
    }



    let ids = tickets.map(ticket => ticket.id)
    // Updates statuses
    let cartTickets = await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: ids
      },
      data: {
        on_sale_status: "inCart"
      }
    })
    // Creates Order with details


    let order = await strapi.db.query('api::order.order').create({
      data: {
        event: event.id,
        eventUuid: eventId,
        users_permissions_user: user,
        userId: user.id,
        tickets,
        paymentProcessor: 'stripe',
        status: 'open',
        processedAt: new Date(),
        total,
        gross,
        details: cart,
        paymentIntentId,
        type: cart?.listing ? 'resale' : 'primary'
      },
    });

    order = await strapi.db.query('api::order.order').findOne({
      where: { id: order.id },
      populate: { 
        tickets: true,
        event: {
          populate: {
            image: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      },
    });

    // Automatically finalize order if free ticket
    if (cart?.ticket?.free) {
      order = await strapi.db.query('api::order.order').update({
        where: { id: order.id },
        data: {
          status: 'complete',
          intentDetails: {
            amount: 0,
            "payment_method": "free"
          },
          emailSent: true
        },
        populate: {
          users_permissions_user: true,
          tickets: true,
          event: {
            populate: {
              image: true,
              venue: {
                populate: {
                  address: true
                }
              }
            }
          }
        }
      });
      // Update ticket statuses
      order.tickets.map(async (ticket) => {          
        await strapi.db.query('api::ticket.ticket').update({
          where: {
            id: ticket.id,
          },
          data: {
            on_sale_status: 'sold'
          },
        });
      })
      // Send Notification
      if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').orderNotification(order);
    }

    return order
  },
  async finalize(ctx) {
    let data = ctx.request.body;
    let type = data.type;
    if (!type) return
    let paymentIntentId;
    let paymentMethodOptions;
    // Handle the event
    switch (type) {
      case 'payment_intent.succeeded':
        paymentIntentId = data.data.object.id;
        paymentMethodOptions = data.data.object;

        let order = await strapi.db.query('api::order.order').findOne({
          where: { paymentIntentId },
          populate: { 
            tickets: true,
            history: true,
            users_permissions_user: true,
            event: {
              populate: {
                image: true,
                venue: {
                  populate: {
                    address: true
                  }
                }
              }
            }
          },
        });

        if (order?.details?.promoCode && order?.details?.promoCode !== 0) {
          const promo = await strapi.db.query('api::promo.promo').findOne({
            where: { code: order?.details?.promoCode },
            populate: {
              promo_sales: true
            }
          })

          if (promo) {
            const pomoSale = await strapi.entityService.create('api::promo-sale.promo-sale', {
              data: {
                purchased: new Date(),
                order: order.id
              },
            });

            let promoSales = [...promo?.promo_sales, pomoSale]
  
            await strapi.entityService.update('api::promo.promo', promo.id, {
              data: {
                promo_sales: promoSales
              },
            });
          }
        }

        if (!order) return;

        order.tickets.map(async (ticket) => {          
          await strapi.db.query('api::ticket.ticket').update({
            where: {
              id: ticket.id,
            },
            data: {
              on_sale_status: 'sold'
            },
          });
        })

        let originalOrder = await strapi.db.query('api::order.order').update({
          where: { paymentIntentId },
          data: {
            status: 'complete',
            intentDetails: paymentMethodOptions,
            emailSent: true
          },
          populate: {
            users_permissions_user: true,
            tickets: true
          }
        });

        if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').orderNotification(order);

        if (!order.details.listing) { 
          strapi.service('api::tracking.tracking').createOrderTracking(originalOrder);
        };

        if (!order.details.listing) return 200

        let listing = await strapi.db.query('api::listing.listing').update({
          where: { id: order.details.listing.id },
          data: {
            status: 'complete'
          },
          populate: {
            tickets: true,
            users_permissions_user: true
          }
        });

        if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').fundsAvailable(listing)

        let fromOrder = await strapi.db.query('api::order.order').findOne({
          where: { id: listing.fromOrder },
          populate: { 
            tickets: true,
            users_permissions_user: true,
          }
        });

        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {
            id: fromOrder.users_permissions_user.id
          }
        }) 

        let originalTicketIds = fromOrder.tickets.map(ticket => ticket.uuid);
        let newOrderTicketIds = order.tickets.map(ticket => ticket.uuid);
        let filteredIds = originalTicketIds.filter(ticket => !newOrderTicketIds.includes(ticket))

        let ticketUpdates = await strapi.db.query('api::ticket.ticket').findMany({
          where: { uuid: filteredIds },
        });

        let updatedOrder = await strapi.db.query('api::order.order').update({
          where: { id: listing.fromOrder },
          data: {
            tickets: ticketUpdates
          },
          populate: {
            tickets: true,
            users_permissions_user: true
          }
        });
        if (!process.env.EMAIL_ENABLED) strapi.service('api::email.email').listingSold(user, order, listing, ticketUpdates);
        strapi.service('api::tracking.tracking').purchaseFromListing(originalOrder, listing);
      break;
      case 'payment_intent.payment_failed':
        paymentIntentId = data.data.object.id;

        order = await strapi.db.query('api::order.order').findOne({
          where: { paymentIntentId },
          populate: { tickets: true },
        });

        ticketIds = order.tickets.map((ticket) => ticket.id)

        await strapi.db.query('api::ticket.ticket').updateMany({
          where: {
            id: ticketIds,
          },
          data: {
            on_sale_status: 'available',
          },
        });

        await strapi.db.query('api::order.order').update({
          where: { paymentIntentId },
          data: {
            status: 'failed'
          }
        });
      break;
    }
    return 200
  },
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const order = await strapi.entityService.findOne('api::order.order', data[0].id, {
      populate: { 
        tickets: {
          filters: {
            $and: [
              {
                on_sale_status: { $notIn: ['resaleAvailable', 'pendingTransfer']}
              }
            ]
          }
        },
        event: {
          populate: {
            image: true,
            fee_structure: true,
            venue: {
              populate: {
                image: true,
                address: true
              }
            }
          },
        },
      },
    }); 

    return order
  }
}));
