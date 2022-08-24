import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';


export default function TicketsWrapper({tickets}) {

    const navigate = useNavigate();

    const groupByName = tickets?.reduce((group, ticket) => {
    const { name } = ticket;
    group[name] = ticket[name] ?? [];
    group[name].push(ticket);
    return group;
    }, {});

    // event tickets delete later
    let eventTickets = [];
    let ticketNames = [];
    if (tickets?.length > 0) {
        // Get Ticket Names
        tickets?.map((ticket) => {
            if (!ticketNames.includes(ticket.name)) ticketNames.push(ticket.name)
        })
        let onSaleTickets = tickets?.filter((ticket) => ticket.on_sale_status === 'available');
        console.log('Ticket Names ', groupByName)
        let soldTickets = tickets?.filter((ticket) => ticket.on_sale_status === 'sold');
        let scheduled = tickets?.filter((ticket) => moment(ticket?.sales_start) > moment());
        let salesEnded = tickets?.filter((ticket) => moment(ticket?.sales_ended) < moment());
        let salesEndedSold = tickets?.filter((ticket) => moment(ticket?.sales_ended) < moment() && ticket.on_sale_status === 'sold' || ticket.on_sale_status === 'resale');
        eventTickets = [
            {
                id: 0,
                type: `${onSaleTickets ? onSaleTickets[0]?.name : 'General Admission'}`,
                status: 'on_sale',
                desc: `Ends ${moment(tickets ? tickets[0]?.sales_end : '').format('MMM DD, yyyy')} at ${moment(tickets ? tickets[0]?.sales_end : '').format('hh:mm A')}`,
                ticketsSold: `${soldTickets?.length}/${tickets?.length}`,
                price: parseFloat(onSaleTickets ? onSaleTickets[0]?.cost : 0),
                show: onSaleTickets?.length > 0 ? true : false
            },
            {
                id: 1,
                type: `${scheduled && scheduled?.length >= 1 ? scheduled[0]?.name : 'General Admission'}`,
                status: 'scheduled',
                desc: `Starts ${moment(tickets ? tickets[0]?.sales_start : '').format('MMM DD, yyyy')} at ${moment(tickets ? tickets[0]?.sales_start : '').format('hh:mm A')}`,
                ticketsSold: `0/${scheduled?.length}`,
                price: parseFloat(scheduled ? scheduled[0]?.cost : 0),
                show: scheduled?.length > 0 ? true : false
            },
            {
                id: 2,
                type: `${salesEndedSold && salesEndedSold?.length >= 1 ? salesEndedSold[0]?.name : 'General Admission'}`,
                status: 'sale_ended',
                ticketsSold: `${salesEndedSold ? salesEndedSold?.length : 0}/${salesEndedSold ? salesEndedSold.length : 0}`,
                price: parseFloat(salesEndedSold ? salesEndedSold[0]?.cost : 0),
                show: salesEndedSold?.length > 0 ? true : false
            }
        ];
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
