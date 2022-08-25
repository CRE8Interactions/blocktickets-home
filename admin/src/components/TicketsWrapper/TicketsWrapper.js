import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';


export default function TicketsWrapper({tickets}) {

    const navigate = useNavigate();

    const getDescription = (ticket) => {
        if (moment(ticket?.sales_start) < moment()) {
            return `Ends ${moment(ticket?.sales_end).format('MMM DD, yyyy')} at ${moment(ticket?.sales_end).format('h:mm A')}`
        } else if (moment(ticket?.sales_start) > moment()) {
            return `Starts ${moment(ticket?.sales_start).format('MMM DD, yyyy')} at ${moment(ticket?.sales_start).format('h:mm A')}`
        } else if (moment(ticket?.sales_end) >= moment()) {
            return ''
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
    // Group tickets by name
    const groupByName = tickets?.reduce((group, ticket) => {
    const { name } = ticket;
    group[name] = ticket[name] = [];
    group[name].push({
        count: tickets.filter((ticket) => ticket.name === name).length,
        sold: tickets.filter((ticket) => ticket.name === name && ticket.on_sale_status === 'sold').length,
        price: tickets.find((ticket) => ticket.name === name).cost,
        salesStart: tickets.find((ticket) => ticket.name === name).sales_start,
        salesEnd: tickets.find((ticket) => ticket.name === name).sales_end,
        eventId: tickets.find((ticket) => ticket.name === name).eventId,
        type: tickets.find((ticket) => ticket.name === name).name,
        status: getStatus(tickets.find((ticket) => ticket.name === name)),
        desc: getDescription(tickets.find((ticket) => ticket.name === name)),
        details: tickets.find((ticket) => ticket.name === name),
        capacity: tickets?.length,
        totalSold: tickets?.filter((ticket) => ticket.on_sale_status === 'sold').length
    });
    return group;
    }, {});

    let ticketNames = [];
    let eventTickets = [];

    if (tickets?.length > 0) {
        // Get Ticket Names
        tickets?.map((ticket) => {
            if (!ticketNames.includes(ticket.name)) ticketNames.push(ticket.name)
        })
        // Parse tickets for component
        ticketNames.map((name, index) => {
            eventTickets.push({
                id: index,
                type: groupByName[name][0]?.type,
                status: groupByName[name][0]?.status,
                desc: groupByName[name][0]?.desc,
                price: groupByName[name][0]?.price,
                ticketsSold: `${groupByName[name][0]?.sold}/${groupByName[name][0]?.count}`,
                show: true,
                capacity: groupByName[name][0]?.capacity,
                totalSold: groupByName[name][0]?.totalSold
            })
        })
    }

    return (
        <section className='max-width-wrapper'>
            <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                <h1>Tickets</h1>
                <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => navigate('create')}>Add ticket</Button>
            </header>
            <Tickets tickets={eventTickets} />
        </section>
    );
}
