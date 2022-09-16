'use strict';
const moment = require('moment');

/**
 *  organization controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::organization.organization', ({ strapi }) => ({
  async myOrgs(ctx) {
    const user = ctx.state.user
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        events: {
          fields: ['*'],
          populate: {
            image: true,
            tickets: true,
            venue: true,
            artists: true
          }
        },
        address: true
      }
    })
    // Returns organizations which user is a member of
    organizations = organizations.filter(org => org.members.length >= 1)
    // Sanitizes response
    organizations = organizations.map(org => {
      org.members.map(member => {
        delete member.password
        delete member.resetPasswordToken
        delete member.confirmationToken
        delete member.provider
      })
      return org
    })

    return organizations
  },
  async teamMembers(ctx) {
    const user = ctx.state.user
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    organization = await strapi.entityService.findOne('api::organization.organization', organization.id, {
      populate: {
        members: {
          fields: ['firstName', 'lastName', 'uuid', 'email'],
          populate: {
            organization_role: true
          }
        }
      },
    });

    return organization
  },
  async createOrEditMember(ctx) {
    const user = ctx.state.user;
    let entry;

    const {
      firstName,
      lastName,
      email,
      role,
      name,
      uuid
    } = ctx.request.body.member;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    const orgRole = await strapi.entityService.findOne('api::organization-role.organization-role', Number(role), {
      
    });

    if (!uuid) {
      entry = await strapi.entityService.create('api::invite-team-member.invite-team-member', {
        data: {
          firstName,
          lastName,
          email,
          organization: organization.id,
          role
        },
      });
    }
    return user
  },
  async getRoles(ctx) {
    const roles = await strapi.db.query('plugin::users-permissions.role').findMany()

    return roles
  },
  async createPaymentInfo(ctx) {
    const user = ctx.state.user;

    const {
      companyName,
      bankName,
      accountNumber,
      routingNumber,
      type,
      address,
      address2,
      city,
      state,
      zip_code
    } = ctx.request.body.data;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    let account = await strapi.entityService.create('api::organization-payment-information.organization-payment-information', {
      data: {
        companyName,
        bankName,
        accountNumber,
        routingNumber,
        accountType: type,
        organization: organization.id,
        currency: 'USD',
        address: {
          address_1: address,
          address_2: address2,
          city,
          state,
          zipcode: zip_code,
          country: 'US'
        }
      },
    });

    return account
  },
  async createW9(ctx) {
    const user = ctx.state.user;

    const {
      taxCode,
      corporation,
      ein,
      sign_by,
      sign_date,
      address,
      address2,
      city,
      state,
      zip_code
    } = ctx.request.body.data;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    let w9 = await strapi.entityService.create('api::w9.w9', {
      data: {
        taxClassification: corporation,
        exemptionCodes: taxCode,
        ein,
        signed: moment(sign_date).toISOString(),
        ipAddress: ctx.request.ip,
        organization: organization.id,
        signedBy: sign_by,
        address: {
          address_1: address,
          address_2: address2,
          city,
          state,
          zipcode: zip_code,
          country: 'US'
        }
      },
    });

    return w9
  },
  async getEvents(ctx) {
    const user = ctx.state.user;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        events: {
          populate: {
            tickets: true,
            image: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)
    return organization?.events;
  },
  async getEvent(ctx) {
    const user = ctx.state.user;

    const {
      uuid
    } = ctx.request.query;

    const event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: uuid },
      populate: {
        tickets: true,
        page_views: true,
        image: true,
        venue: {
          populate: {
            address: true
          }
        }
      }
    });

    return event;

  },
  async createEvent(ctx) {
    const {
      name,
      presentedBy,
      start,
      end,
      venue,
      status,
      currency,
      online_event,
      organizationId,
      hide_end_date,
    } = ctx.request.body.data;

    const entry = await strapi.db.query('api::event.event').create({
      data: {
        name,
        presentedBy,
        start,
        end,
        venue,
        status,
        currency,
        online_event,
        organizationId,
        hide_end_date
      },
    });

    return entry
  },
  async getOrdersByEvent(ctx) {
    const user = ctx.state.user;

    const {
      uuid
    } = ctx.request.query;

    const orders = await strapi.db.query('api::order.order').findMany({
      where: {
        $and: [
          { eventUuid: {$eq: uuid} }
        ]
      },
      populate: {
        users_permissions_user: {
          select: ['firstName', 'lastName', 'phoneNumber', 'email']
        }
      }
    });

    let data = {};
    data['grossSales'] = parseFloat(orders?.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0)).toFixed(2);
    data['count'] = orders?.length;
    data['attendeesCount'] = orders?.reduce((accumulator, object) => {
      return accumulator + object.details.ticketCount;
    }, 0)
    data['orders'] = orders;

    return data

  },
  async addEventDetails(ctx) {
    const user = ctx.state.user;
    const { eventUUID, description, image } = ctx.request.body.data;

    const event = await strapi.db.query('api::event.event').update({
      where: { uuid: eventUUID },
      data: {
        summary: description,
        image: image
      },
      populate: {
        image: true
      }
    });

    return event
  },
  async getEventStats(ctx) {
    const user = ctx.state.user;
    let dateFrom;

    const {
      uuid,
      range
    } = ctx.request.query;

    switch(range) {
      case '24_hrs':
        dateFrom = moment().subtract(1, 'd').format()
        break;
      case '7_days':
        dateFrom = moment().subtract(7, 'd').format()
        break;
      case '14_days':
        dateFrom = moment().subtract(14, 'd').format()
        break;
      case '30_days':
        dateFrom = moment().subtract(30, 'd').format()
        break;
      case 'all':
        dateFrom = moment().subtract(1, 'y').format()
        break;
      default:
        dateFrom = moment().subtract(1, 'd').format()
    }

    const event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: uuid },
      populate: {
        page_views: true
      }
    })

    const allTickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: {
        $and: [
          { eventId: { $eq: uuid }}
        ]
       }
    })

    const orders = await strapi.db.query('api::order.order').findMany({
      where: {
        $and: [
          { event: event.id }
        ]
       },
       populate: {
        tickets: true
       }
    })

    const last24HrOrders = orders.filter(order => moment(order.processedAt).format() >= moment().subtract(1, 'd').format())

    const last24HrPageViews = event.page_views.filter(view => moment(view.seen).format() >= moment().subtract(1, 'd').format()).length

    const last24HrGrossSales = parseFloat(last24HrOrders?.reduce((accumulator, object) => {
      return accumulator + (object.total);
    }, 0)).toFixed(2);

    const last24HrTicketsSold = parseFloat(last24HrOrders?.reduce((accumulator, object) => {
      return accumulator + (object.tickets);
    }, 0)).toFixed(2);

    const getPercentage = (v1, v2) => {
      let change = v2 - v1;
      let percentage = change / v1;
      return (percentage * 100).toFixed(0);
    }

    const queryOrders = orders.filter(order => moment(order.processedAt).format() >= dateFrom && order.status === 'complete')

    const queryOrdersGross = parseInt(queryOrders?.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0));

    const queryTicketLength = parseInt(queryOrders?.reduce((accumulator, object) => {
      return accumulator + object.tickets.length;
    }, 0));

    const listings = await strapi.db.query('api::listing.listing').findMany({
      where: {
        $and: [
          { event: event.id },
          { status: { $eq: 'new' } }
        ]
       },
       populate: {
        tickets: true
       }
    })

    let primaryOrders = orders.filter(order => order.type !== 'resale')
    let secondaryOrders = orders.filter(order => order.type === 'resale')

    let primaryTicketsSold = allTickets?.filter((ticket) => ticket.on_sale_status === 'sold' && ticket.resale === false);
    let secondaryTicketsSold = allTickets?.filter((ticket) => ticket.on_sale_status === 'sold' && ticket.resale === true);

    let data = {};
    data['allTicketsSold'] = allTickets?.filter((ticket) => ticket.on_sale_status === 'sold').length;
    data['ticketSoldByRange'] = parseInt(queryOrders?.reduce((accumulator, object) => {
      return accumulator + object.tickets.length;
    }, 0));
    data['ticketSoldByRangeChange'] = getPercentage(Number(data.ticketSoldByRange),  Number(last24HrTicketsSold.length));
    data['primaryTicketsSold'] = primaryTicketsSold?.length;
    data['secondaryTicketsSold'] = secondaryTicketsSold?.length;
    data['totalTickets'] = allTickets?.length;
    data['primaryGrossSales'] = parseFloat(primaryOrders?.reduce((accumulator, object) => {
      return accumulator + (object.total);
    }, 0)).toFixed(2);
    data['primaryGrossSalesRangeChange'] = getPercentage(parseFloat(data.primaryGrossSales), parseFloat(queryOrdersGross))
    data['secondaryGrossSales'] = parseFloat(secondaryOrders?.reduce((accumulator, object) => {
      return accumulator + (object.total);
    }, 0)).toFixed(2);
    data['primaryNetSales'] = parseFloat(primaryOrders?.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0)).toFixed(2);
    data['secondaryNetSales'] = parseFloat(secondaryOrders?.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0)).toFixed(2);
    data['pageViews'] = event?.page_views?.length;
    data['pageViewsRangeChange'] = getPercentage(event?.page_views?.length, last24HrPageViews);
    data['totalSoldPercentage'] = ((data?.allTicketsSold / data?.totalTickets) * 100).toFixed(2);
    data['totalSoldQueryPercentage'] = getPercentage(data?.allTicketsSold, queryTicketLength);
    data['eventUUID'] = event?.uuid;
    data['allTicketsSoldAmount'] = (parseFloat(data.primaryGrossSales)).toFixed(2);
    data['ticketsListed'] = parseInt(listings?.reduce((accumulator, object) => {
      return accumulator + object.tickets.length;
    }, 0));

    return data
  },
  async allEventStats(ctx) {
    const user = ctx.state.user;

    // Get Organizations member belongs to
    let organizations = await strapi.entityService.findMany('api::organization.organization', {
      populate: {
        members: {
          filters: {
            id: {
              $eq: user.id
            }
          }
        },
        events: {
          populate: {
            image: true,
            tickets: true,
            venue: {
              populate: {
                address: true
              }
            }
          }
        }
      }
    })
    // Returns organizations which user is a member of
    let organization = organizations.find(org => org.members.length >= 1)

    let eventsData = [];

    const getStats = (data, tickets, orders) => {

      let primaryOrders = orders.filter(order => order.type !== 'resale')
      let secondaryOrders = orders.filter(order => order.type === 'resale')

      new Promise(resolve => {
        const primaryGross = parseFloat(primaryOrders?.reduce((accumulator, object) => {
          return accumulator + (object.total);
        }, 0)).toFixed(2);
  
        const secondaryGross = parseFloat(secondaryOrders?.reduce((accumulator, object) => {
          return accumulator + (object.total);
        }, 0)).toFixed(2);
  
        const primaryRoyalties = parseFloat(tickets.filter((ticket) => ticket.resale == false && ticket.on_sale_status === 'sold')?.reduce((accumulator, object) => {
          return accumulator + (object.fee);
        }, 0)).toFixed(2);
  
        const secondaryRoyalties = parseFloat(tickets.filter((ticket) => ticket.resale == true && ticket.on_sale_status === 'sold')?.reduce((accumulator, object) => {
          return accumulator + (object.fee);
        }, 0)).toFixed(2);
  
        data['primaryAvailable'] = tickets.filter((ticket) => ticket.resale == false).length;
        data['primarySold'] = tickets.filter((ticket) => ticket.resale == false && ticket.on_sale_status === 'sold').length;
        data['primarySoldPercentage'] = data.primarySold > 0 ? ((data.primarySold / data.primaryAvailable) * 100) : 0;
        data['primaryGross'] = Number(primaryGross).toFixed(2);
        data['secondaryGross'] = secondaryGross;
        data['secondaryAvailable'] = tickets.filter((ticket) => ticket.resale == true).length;
        data['secondarySold'] = tickets.filter((ticket) => ticket.resale == true && ticket.on_sale_status === 'sold').length;
        data['secondarySoldPercentage'] = data.secondarySold > 0 ? Number((data.secondarySold / data.secondaryAvailable) * 100).toFixed(2) : 0;
        data['royalties'] = (Number(primaryRoyalties) + Number(secondaryRoyalties)).toFixed(2)
        eventsData.push(data)
        resolve(data)
      })
      return eventsData
    }
      

    for (let event of organization.events) {
      let data = {}
      data['eventName'] = event.name;
      data['eventImage'] = event?.image?.url;
      data['eventUUID'] = event?.uuid;
      data['venueName'] = event?.venue?.name;
      data['eventDate'] = event?.start;
      data['status'] = event?.status;

      const orders = await strapi.db.query('api::order.order').findMany({
        where: {
          $and: [
            { event: event.id }
          ]
         }
      })
  
      let tickets = await strapi.db.query('api::ticket.ticket').findMany({
        where: {
          $and: [
            { eventId: { $eq: event?.uuid }}
          ]
        }
      })

      let info = await getStats(data, tickets, orders);
    }

    return eventsData
  },
  async getTicketDetails(ctx) {
    const {
      uuid
    } = ctx.request.query;

    const tickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: {
        $and: [
          { eventId: { $eq: uuid }}
        ]
       }
    })

    const getDescription = (ticket) => {
      if (new Date(ticket?.sales_start) < new Date()) {
          return ticket?.sales_end
      } else if (new Date(ticket?.sales_start) > new Date()) {
          return ticket?.sales_start
      } else if (new Date(ticket?.sales_end) >= new Date()) {
          return ticket?.sales_end
      }
    }

    const getStatus = (ticket) => {
        if (moment(ticket.sales_start) > moment()) {
            return 'scheduled'
        } else if (moment(ticket?.sales_start) < moment()) {
            return 'on_sale'
        } else if (moment(ticket?.sales_end) >= moment()) {
            return 'sale_ended'
        }
    }

    let ticketGroups = []

    tickets.map(t => {
      let index = ticketGroups.findIndex((e) => e.name === t.name);
      if (index > -1) return;
      ticketGroups.push({
        name: t.name,
        count: tickets.filter((ticket) => ticket.name === t.name).length,
        sold: tickets.filter((ticket) => ticket.name === t.name && ticket.on_sale_status === 'sold').length,
        price: tickets.find((ticket) => ticket.name === t.name).cost,
        salesStart: tickets.find((ticket) => ticket.name === t.name).sales_start,
        salesEnd: tickets.find((ticket) => ticket.name === t.name).sales_end,
        eventId: tickets.find((ticket) => ticket.name === t.name).eventId,
        type: tickets.find((ticket) => ticket.name === t.name).name,
        status: getStatus(tickets.find((ticket) => ticket.name === t.name)),
        desc: getDescription(tickets.find((ticket) => ticket.name === t.name)),
        totalTicketsSold: tickets?.filter((ticket) => ticket.on_sale_status === 'sold').length,
        totalTickets: tickets?.length
      })    
    })

    return ticketGroups
  },
  async createPromoLink(ctx) {
    const { uuid, name } = ctx.request.body.data;

    const event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: uuid}
    })

    const entry = await strapi.entityService.create('api::promo.promo', {
      data: {
        name: name,
        event: event.id,
        code: await strapi.service('api::utility.utility').generatePromoCode()
      },
    });

    return entry
  },
  async getPromoLinks(ctx) {
    const {
      uuid
    } = ctx.request.query;

    const event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: uuid}
    })

    const promos = await strapi.db.query('api::promo.promo').findMany({
      where: { event: event.id },
      populate: {
        promo_views: true,
        promo_sales: {
          populate: {
            order: true
          }
        }
      }
    })

    if (!promos) return 200

    let arr = []

    promos?.map((promo) => {
      let data = {}
      let orders = promo?.promo_sales?.map(sale => sale?.order);
      let ticketsSold = parseInt(orders?.reduce((accumulator, object) => {
        return accumulator + (object?.details?.ticketCount);
      }, 0));
      let grossSales = parseFloat(orders?.reduce((accumulator, object) => {
        return accumulator + (object?.total);
      }, 0)).toFixed(2);

      let path = process.env.NODE_ENV === 'production' ? 'https://blocktickets.xyz' : 'https://preview.blocktickets.xyz'
      data['name'] = promo?.name
      data['code'] = promo?.code
      data['url'] = `${path}/tickets/${event.uuid}?code=${data.code}`
      data['views'] = promo?.promo_views?.length
      data['ticketsSold'] = ticketsSold
      data['grossSales'] = grossSales
      arr.push(data)
    })

    return arr
  }
}));
