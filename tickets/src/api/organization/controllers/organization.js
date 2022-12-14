'use strict';
const moment = require('moment');
const bcrypt = require('bcryptjs');

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

    let teamMembers = await strapi.entityService.findMany('api::invite-team-member.invite-team-member', {
      filters: {
        $and: [
          { claimed: false }
        ]
       },
      populate: {
        organization_role: true,
        organization: {
          filters: {
            id: {
              $eq: organization.id
            },
          }
        }
      }
    })
    // Filters out members with non matching org
    teamMembers = teamMembers.filter(team => team.organization !== null)

    let arr = []
    // Adds pending invite to members array
    teamMembers?.map(member => arr.push({id: member.id, firstName: member.firstName, lastName: member.lastName, email: member.email, uuid: member.uuid, organization_role: member.organization_role, pending: true }) )

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

    if (arr.length > 0) organization['members'] = [...organization.members, ...arr]

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

    let data = {}

    // Lets get all members of the organization
    let orgMembers = await strapi.db.query('api::organization.organization').findOne({
      where: { id: organization.id },
      populate: { members: true },
    });

    let members = orgMembers.members;

    let hasMember = members.find((member => member.email === email)) 

    const invite = await strapi.db.query('api::invite-team-member.invite-team-member').findOne({
      where: { 
        $and: [
         { email },
         { claimed: false },
        ]
       }
    });

    if (!hasMember && !invite) {
      let entry = await strapi.entityService.create('api::invite-team-member.invite-team-member', {
        data: {
          firstName,
          lastName,
          email,
          organization: organization.id,
          organization_role: role
        },
        populate: {
          organization_role: true
        }
      });
      let host;
      if (process.env.NODE_ENV === 'development') {
        host = 'http://localhost:3001';
      } else {
        host = 'https://admin.blocktickets.xyz';
      }
      
      let params = {
        firstName,
        orgName: organization.name,
        code: entry.inviteCode,
        email,
        host
      }
      if (true) await strapi.service('api::email.email').sendMemberInvite(params)
    } else if (invite && !hasMember) {
      entry = await strapi.db.query('api::invite-team-member.invite-team-member').update({
        where: { id: invite.id },
        data: {
          firstName,
          lastName,
          email,
          organization: organization.id,
          organization_role: role
        },
        populate: {
          organization_role: true
        }
      });
    } else if (hasMember) {
      entry = await strapi.db.query('plugin::users-permissions.user').update({
        where: { uuid: hasMember.uuid },
        data: {
          firstName,
          lastName,
          email,
          organization_role: role
        },
        populate: {
          organization_role: true
        }
      });
    }

    let arr = [];

    let teamMembers = await strapi.entityService.findMany('api::invite-team-member.invite-team-member', {
      filters: {
        $and: [
          { claimed: false },
          { organization: organization.id }
        ]
       },
      populate: {
        organization_role: true,
        organization: {
          filters: {
            id: {
              $eq: organization.id
            },
          }
        }
      }
    })

    teamMembers?.map(member => arr.push({id: member.id, firstName: member.firstName, lastName: member.lastName, email: member.email, uuid: member.uuid, organization_role: member.organization_role, pending: true }) )

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

    if (arr.length > 0) organization['members'] = [...organization.members, ...arr]

    let res = [];
    await organization['members'].map(member => {
      let data = {}
      data['name'] = `${member.firstName} ${member.lastName}`
      data['email'] = `${member.firstName} ${member.lastName}`
      data['role'] = member.organization_role
      data['uuid'] = member.uuid
      res.push(data)
    })

    return res
  },
  async addMemberToTeam(ctx) {
    const {
      user,
      invite
    } = ctx.request.body.data;

    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: {
        name: 'Organizer'
      }
    })

   const currentUser = await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: {
        organization_role: invite.organization_role.id,
        role: role
      },
    });

    let org = await strapi.entityService.findOne('api::organization.organization', invite.organization.id, {
      populate: {
        members: {
          fields: ['firstName', 'lastName', 'uuid', 'email'],
        }
      },
    });

    await strapi.db.query('api::organization.organization').update({
      where: { id: org.id },
      data: {
        members: [...org.members, currentUser]
      },
    });

    await strapi.db.query('api::invite-team-member.invite-team-member').update({
      where: { id: invite.id },
      data: {
        claimed: true,
        claimedOn: new Date()
      },
    });

    return 200
  },
  async removeTeamMember(ctx) {
    const user = ctx.state.user;
    const {
      firstName,
      lastName,
      email,
      role,
      name,
      uuid
    } = ctx.request.body;
    
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
    // Removes team invite if unclaimed
    const invite = await strapi.db.query('api::invite-team-member.invite-team-member').findOne({
      where: { 
        $and: [
         { email },
         { claimed: false },
        ]
       },
       populate: {
        organization: {
          filters: {
            id: {
              $eq: organization.id
            }
          }
        }
      }
    });

    let orgMembers = await strapi.db.query('api::organization.organization').findOne({
      where: { id: organization.id },
      populate: { members: true },
    });

    let members = orgMembers.members;

    let hasMember = members.find((member => member.email === email))

    if (invite?.organization?.id === organization?.id) {
      await strapi.db.query('api::invite-team-member.invite-team-member').delete({
        where: { id: invite.id },
      });
    }

    if (hasMember) {
      let newMembers = members.filter(mem => mem.email !== email)

      await strapi.db.query('api::organization.organization').update({
        where: { id: organization.id },
        data: {
          members: newMembers,
        },
      });
    }

    return 200

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
        page_views: true,
        image: true,
        fee_structure: true,
        venue: {
          populate: {
            address: true
          }
        }
      }
    });

    const tickets = await strapi.db.query('api::ticket.ticket').findMany({
      where: { eventId: event.uuid }
    })
    event['tickets'] = tickets;
    event['capacity'] = tickets.length;

    if (tickets && tickets.length > 0) {
      const cost = tickets.map((ticket) => ticket.cost);
      event['priceRange'] = {
        low: Math.min(...cost),
        high: Math.max(...cost)
      }
    }

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
      hide_start_date,
      hide_doors_open,
      doorsOpen
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
        hide_end_date,
        hide_start_date,
        hide_doors_open,
        doorsOpen
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

    let primaryTicketsSold = allTickets?.filter((ticket) => (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer') && ticket.resale === false);
    let secondaryTicketsSold = allTickets?.filter((ticket) => (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer') && ticket.resale === true);

    let data = {};
    data['allTicketsSold'] = allTickets?.filter((ticket) => (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer')).length;
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
  
        const primaryRoyalties = parseFloat(tickets.filter((ticket) => ticket.resale == false && (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer' || ticket.on_sale_status === 'resaleAvailable'))?.reduce((accumulator, object) => {
          return accumulator + (object.fee);
        }, 0)).toFixed(2);
  
        const secondaryRoyalties = parseFloat(tickets.filter((ticket) => ticket.resale == true && (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer' || ticket.on_sale_status === 'resaleAvailable')) ?.reduce((accumulator, object) => {
          return accumulator + (object.fee);
        }, 0)).toFixed(2);
  
        data['primaryAvailable'] = tickets.filter((ticket) => ticket.resale == false).length;
        data['primarySold'] = tickets.filter((ticket) => ticket.resale == false && (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer' || ticket.on_sale_status === 'resaleAvailable')).length;
        data['primarySoldPercentage'] = data.primarySold > 0 ? ((data.primarySold / data.primaryAvailable) * 100) : 0;
        data['primaryGross'] = Number(primaryGross).toFixed(2);
        data['secondaryGross'] = secondaryGross;
        data['secondaryAvailable'] = tickets.filter((ticket) => ticket.resale == true).length;
        data['secondarySold'] = tickets.filter((ticket) => ticket.resale == true && (ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'pendingTransfer' || ticket.on_sale_status === 'resaleAvailable')).length;
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
  async editPromoLink(ctx) {
    const {
      id,
      name
    } = ctx.request.body;

    const entry = await strapi.db.query('api::promo.promo').update({
      where: { id: id },
      data: {
        name: name,
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
      data['id'] = promo?.id
      data['code'] = promo?.code
      data['url'] = `${path}/tickets/${event.uuid}?code=${data.code}`
      data['views'] = promo?.promo_views?.length
      data['ticketsSold'] = ticketsSold
      data['grossSales'] = grossSales
      arr.push(data)
    })

    return arr
  },
  async getPaymentInfo(ctx) {
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
  
    let paymentInfo = await strapi.db.query('api::organization-payment-information.organization-payment-information').findOne({
      where: { organization: organization.id },
    });

    if (!paymentInfo) ctx.send('No payment Info', 204)

    return paymentInfo
  },
  async inviteValid(ctx) {
    const {
      code
    } = ctx.request.query;

    if (code == 'null') return ctx.throw('Missing invite code', 403)

    const invite = await strapi.db.query('api::invite-team-member.invite-team-member').findOne({
      where: {
        $and: [
          { inviteCode: code},
          { claimed: false }
        ]
      },
      populate: { 
        organization_role: true,
        organization: true
      },
    });

    if (!invite) return ctx.throw('Invalid invite code', 403)

    return ctx.send(invite)
  },
  async updateDetails(ctx) {
    const {
      id,
      name,
      address
    } = ctx.request.body;

    const organization = await strapi.entityService.update('api::organization.organization', id, {
      data: {
        name,
        address
      },
    });

    return organization;
  },
  async updateUserEmail(ctx) {
    const user = ctx.state.user;

    const {
      email
    } = ctx.request.body;

    const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: {
        email,
        username: email
      },
    });

    const tokenData = await strapi.service('api::verify.verify').sendJwt(entry)
    return tokenData
  },
  async updateUsersName(ctx) {
    const user = ctx.state.user;

    const {
      firstName,
      lastName
    } = ctx.request.body;

    const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: {
        firstName,
        lastName
      },
    });

    const tokenData = await strapi.service('api::verify.verify').sendJwt(entry)
    return tokenData
  },
  async emailValid(ctx) {
    let {
      email
    } = ctx.request.body;
    
    email = email.toLowerCase();

    const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { 
        username: { 
          $eq: email, 
        } 
      },
    });

    if (entry) ctx.send('Email Taken', 402)

    return 200
  },
  async resetPassword(ctx) {
    let user = ctx.state.user;

    let {
      password,
      newPassword
    } = ctx.request.body;

    const validPassword = await strapi
      .service("plugin::users-permissions.user")
      .validatePassword(password, user.password);
    
    if (!validPassword) return ctx.throw(401, "wrong-current-password")

    // Generate new hashed password
    const pw = bcrypt.hashSync(newPassword, 10);

    user = await strapi.query("plugin::users-permissions.user").update({
      where: { id: user.id },
      data: { resetPasswordToken: null, password: pw },
    });

    const tokenData = await strapi.service('api::verify.verify').sendJwt(user)
    return tokenData
  },
  async myPermissions(ctx) {
    let user = ctx.state.user;

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

    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { id: user.id },
      populate: { 
        role: true,
        organization_role: {
          populate: {
            organization_permissions: true
          }
        }
      },
    });

    return user 
  },
  async removeBankAccount(ctx) {
    let user = ctx.state.user;

    let {
      accountId,
    } = ctx.request.body;

    const entry = await strapi.db.query('api::organization-payment-information.organization-payment-information').delete({
      where: { id: accountId },
    });

    return 200
  },
  async getW9(ctx) {
    let user = ctx.state.user;

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

    const entry = await strapi.db.query('api::w9.w9').findOne({
      where: { organization: organization.id },
      populate: {
        address: true,
        organization: true
      }
    });

    return entry
  },
  async guestList(ctx) {
    const {
      uuid
    } = ctx.request.query;

    const guestList = await strapi.db.query('api::guest-list.guest-list').findMany({
      where: { eventId: uuid }
    });

    return guestList

  },
  async createGuestList(ctx) {
    const {
      firstName,
      lastName,
      phoneNumber,
      quantity,
      ticketType,
      event
    } = ctx.request.body;

    const $event = await strapi.db.query('api::event.event').findOne({
      where: { uuid: event }
    });

    let guestList = await strapi.db.query('api::guest-list.guest-list').create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        quantity,
        ticketType,
        event: $event.id,
        eventId: event,
        requested: new Date()
      },
    });

    let guestArr = []

    for (let i = 1; i <= Number(quantity); i++) {
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
      let letter = letters[Math.floor(Math.random()*10)]
      await new Promise((resolve, reject) => {
        resolve(
          guestArr.push(
            {
              eventId: event, accessCode: `${letter}-${Math.floor(100000 + Math.random() * 900000)}`, phoneNumber, type: ticketType, guestListId: guestList.id
            }
          )
        )
      })
    }

    // Waits for the guestArr to be populated before continuing
    let arr = await Promise.all(guestArr)
    // Creates All passes in bulk
    let passes = await strapi.db.query('api::guest-pass.guest-pass').createMany({
      data: arr
    })

    // Queries for newly created passes as bulk creation doesn't allow for relation creation
    passes = await strapi.db.query('api::guest-pass.guest-pass').findMany({
      where: { eventId: event, guestListId: guestList.id }
    })

    guestList = await strapi.db.query('api::guest-list.guest-list').update({
      where: { id: guestList.id },
      data: {
        guest_passes: passes
      },
      populate: {
        guest_passes: true
      }
    })

    strapi.service('api::notification.notification').guestListNotification(guestList, $event);

    return guestList
  },
  async removeGuestList(ctx) {
    const {
      id,
      event
    } = ctx.request.body;

    let guestList = await strapi.db.query('api::guest-list.guest-list').delete({
      where: { id: id },
    })

    await strapi.db.query('api::guest-pass.guest-pass').deleteMany({
      where: {
        $and: [
          {
            eventId: event,
          },
          {
            guestListId: id,
          },
        ]
      },
    });

    return 200
  },
  async ticketTypes(ctx) {
    const {
      uuid
    } = ctx.request.query;

    const entries = await strapi.db.query('api::ticket.ticket').findMany({
      select: ['name'],
      where: { eventId: uuid },
    });

    const unique = Array.from(new Set(entries.map(item => item.name)));

    return unique
  },
  async getEventAttendees(ctx) {
    const {
      eventUUID,
      start
    } = ctx.request.query;

    let ticketsArr = []

    const orders = await strapi.entityService.findMany('api::order.order', {
      filters: { eventUuid: eventUUID },
      populate: { 
        tickets: true,
        users_permissions_user: {
          fields: ['email', 'firstName', 'lastName', 'phoneNumber']
        }
      },
      start: start ? start : 0
    });

    orders.map((order) => {
      order.tickets.map((ticket) => {
        let attr = {}
        attr['email'] = order?.users_permissions_user?.email
        attr['name'] = `${order?.users_permissions_user?.firstName} ${order?.users_permissions_user?.lastName}`
        attr['phone'] = `${order?.users_permissions_user?.phoneNumber}`
        attr['ticketType'] = `${ticket?.name}`
        attr['marketType'] = ticket?.resale ? 'Secondary' : 'Primary'
        attr['checkInCode'] = ticket?.checkInCode
        ticketsArr.push(attr)
      })
    })

    return ticketsArr
  },
  async getTaxRates(ctx) {
    const {
      city,
      state
    } = ctx.request.query;

    const entry = await strapi.db.query('api::sales-tax.sales-tax').findOne({
      where: {
        abbreviation: {
          $eq: state.toLowerCase()
        }
      },
      populate: { 
        sales_tax_rates: {
          where: {
            city: {
              $eq: city.toLowerCase()
            }
          }
        }
      },
    });

    return entry
  }
}));
