import React, { useState } from 'react';

import { formatCurrency, formatNumber } from '../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

import { ExportSelect } from '../ExportSelect';
import { SearchBar } from '../SearchBar'
import { TicketRow } from './TicketRow'

import './attendeesReportWrapper.scss';

export default function AttendeesReportWrapper({ orderId, ticketId }) {

    // demo - same orders array that is built from data from database 
    const ordersObj = [
        {
            orderId: 19331942333101,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10001,
                    status: 'standard',
                    price: 45.50
                },
                {
                    id: 11111,
                    status: 'standard',
                    price: 45.50
                }
            ],
            status:
            {
                key: 'Purchased by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            }

        },
        {
            orderId: 19331942333102,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'billy',
                lastName: 'bob'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10002,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 10002,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                key: 'Transferred by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            }

        },
        {
            orderId: 19331942333103,
            marketType: 'primary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10003,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 10003,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                key: 'Purchased by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            },
            refund: {
                date: 'Feb 12, 2022 at 4:29 PM (EDT)'
            }

        },
        {
            orderId: 19331942333104,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'chaz',
                lastName: 'haskins'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10004,
                    status: 'standard',
                    price: 80
                },
                {
                    id: 11114,
                    status: 'standard',
                    price: 80
                }
            ],
            status:
            {
                key: 'Sold by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'

            }
        },
        {
            orderId: 19331942333105,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harry',
                lastName: 'walkins'
            },
            ticketType: 'general_admission',
            totalTickets: 2,
            tickets: [
                {
                    id: 10004,
                    status: 'transferred',
                    price: 80
                },
                {
                    id: 11114,
                    status: 'transferred',
                    price: 80
                }
            ],
            status:
            {
                key: 'Transferred by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'

            }
        },
        {
            orderId: 19331942333106,
            marketType: 'secondary',
            ticketBuyer: {
                firstName: 'harrison',
                lastName: 'cogan'
            },
            totalTickets: 2,
            ticketType: 'general_admission',
            tickets: [
                {
                    id: 10006,
                    status: 'transferred',
                    price: 45.50
                },
                {
                    id: 10006,
                    status: 'transferred',
                    price: 45.50
                },
            ],
            status: {
                key: 'Sold by',
                name: 'Harrison Cogan (416.809.5557) on Mar 19, 2022 at 11:18am (EDT)'
            },
            refund: {
                date: 'Feb 12, 2022 at 4:29 PM (EDT)'
            }
        },
    ]

    const [exportTo, setExportTo] = useState('1')

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleSearch = (query) => {
        setQuery(query)
    }

    const order = ordersObj.find(order => order.orderId == orderId)

    const ticket = order.tickets.find(ticket => ticket.id == ticketId)

    let ticketArr = ticket ? [ticket] : order.tickets;

    return (
        <>
            <section>
                <header className='section-header' id="attendees-report-header">
                    <div className="section-header" >
                        <div className="section-heading">
                            <h1>Attendees report</h1>
                        </div>
                        <p className='section-header-desc'>View and download your attendees information</p>
                    </div>
                    <div className="actions-group-flex">
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by attendee name, email address" />
                        <ExportSelect setExportTo={setExportTo} exportTo={exportTo} />
                    </div>
                    <Stack direction="horizontal" className='mt-4 split-row'>
                        <Stack as="ul" direction="horizontal" className="horizontal-list">
                            <li>
                                Gross sales
                                <span>{formatCurrency(10000)}</span>
                            </li>
                            <li>
                                Orders
                                <span>{formatNumber(50)}</span>
                            </li>
                            <li>
                                Attendees
                                <span>{formatNumber(10)}</span>
                            </li>
                        </Stack>
                    </Stack>
                </header>


                <div className="full-width-table table-container">
                    <Table className='table-lg'>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Order date</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Quantity</th>
                                <th>Transaction type</th>
                                <th>Ticket type</th>
                                <th>Market type</th>
                                <th>Paid</th>
                                <th>Service fees</th>
                                <th>Facility fee</th>
                                <th>Payment processing fee</th>
                                <th>Tax</th>
                                <th>Attendee status</th>
                                <th>Payment method</th>
                                <th>Last 4 digits</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip code</th>
                                <th>Gender</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketArr.map(ticket => (
                                <TicketRow key={order.orderId} orderId={order.orderId} ticket={ticket} firstName={order.ticketBuyer.firstName} lastName={order.ticketBuyer.lastName} marketType={order.marketType} paid={order.paid} type={order.ticketType} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
}
