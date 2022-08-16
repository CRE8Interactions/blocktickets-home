'use strict';
const { v4: uuidv4 } = require('uuid');
/**
 *  ticket controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({
  strapi
}) => ({
  async assign(ctx) {
    return true
  },
  async create(ctx) {
    let data = ctx.request.body.data
    // Adds 
    let ticketArr = []

    for (let i = 1; i <= Number(data.quantity); i++) {
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
      let letter = letters[Math.floor(Math.random()*10)]
      await new Promise((resolve, reject) => {
        resolve(
          ticketArr.push(
            {name: data.name, cost: data.cost, description: data.description, minimum_quantity: data.minimum_quantity, 
              maximum_quantity: data.maximum_quantity, status: 'available', minResalePrice: data.minResalePrice, maxResalePrice: data.maxResalePrice,
              sales_start: data.sales_start, sales_end: data.sales_end, fee: data.fee, royalty: data.royalty, eventId: data.eventId,
              checkInCode: `${letter}-${Math.floor(100000 + Math.random() * 900000)}`, uuid: uuidv4(), generalAdmission: data.generalAdmission
            }
          )
        )
      })
    }
    // Waits for the ticketArr to be populated before continuing
    let arr = await Promise.all(ticketArr)
    // Creates All tickets in bulk
    let newTickets = await strapi.db.query('api::ticket.ticket').createMany({
      data: arr
    })
    // Queries for newly created tickets as bulk creation doesn't allow for relation creation
    let tickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: { eventId: data.eventId, on_sale_status: 'available' }
    })
    // Creates relation to event 
    let event = await strapi.db.query('api::event.event').update({
      where: { id: data.eventId },
      data: {
        tickets: tickets
      },
      populate: {
        tickets: true,
        image: true,
        venue: {
          populate: {
            address: true
          }
        }
      }
    })

    return event
  },
  async find(ctx) {
    // some logic here
    let response = await super.find(ctx);
    response.data.map(r => {
      delete r.attributes.checkInCode
      delete r.attributes.uuid
    })
    return response;
  }
}));
