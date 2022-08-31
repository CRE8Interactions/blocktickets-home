'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

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

    let myEvent = await strapi.db.query('api::event.event').findOne({
      where: { uuid: data.eventId }
    });

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
      where: { uuid: data.eventId },
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
  },
  async updateAll(ctx) {
    let data = ctx.request.body.data;

    let myEvent = await strapi.db.query('api::event.event').findOne({
      where: { uuid: data.eventId },
      populate: {
        tickets: true
      }
    });

    let ticketIds = myEvent.tickets.filter((ticket) => ticket.name === data.type)
    ticketIds = ticketIds.map((ticket) => ticket.id)

    await strapi.db.query('api::ticket.ticket').updateMany({
      where: {
        id: {
          $in: ticketIds
        }
      },
      data
    });

    myEvent = await strapi.db.query('api::event.event').findOne({
      where: { uuid: data.eventId },
      populate: {
        tickets: true
      }
    });

    return myEvent
  },
  async makeInactive(ctx) {
    let data = ctx.request.body.data;

    let myEvent = await strapi.db.query('api::event.event').findOne({
      where: { uuid: data.eventId },
      populate: {
        tickets: {
          where: {
            $and: [
              { on_sale_status: { $in: 'available' }},
              { isActive: { $eq: true }}
            ]
          }
        }
      }
    });
  },
  async availableTickets(ctx) {
    const { eventUUID } = ctx.request.query;

    let event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: eventUUID },
      populate: {
        venue: {
          populate: {
            address: true
          }
        },
        image: true
      }
    });

    await strapi.entityService.create('api::page-view.page-view', {
      data: {
        seen: new Date(),
        event: event.id
      },
    });

    let eventTickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: {
        $and: [
          { eventId: eventUUID },
          { on_sale_status: { $in: 'available' }},
          { isActive: { $eq: true }}
        ]
      }
    });

    let ticketTypes = [];

    eventTickets?.map((ticket) => {
      const t = ticketTypes.find(element => {
        if (element.name === ticket?.name) {
          return true;
        }
      
        return false;
      });

      if (t === undefined) {
        delete ticket?.checkInCode
        ticket['availableCount'] = eventTickets?.filter((t) => t.name === ticket?.name).length;
        if (moment(ticket?.sales_start) >= moment()) return
        ticketTypes.push(ticket)
      }
    })

    let data = {}
    delete event?.tickets;
    data['event'] = event;
    data['tickets'] = ticketTypes;
    data['scheduledCount'] = eventTickets?.filter((t) => moment(t?.sales_start) >= moment()).length;

    return data
  }
}));
