import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { formatCurrency, formatNumber } from "./../../utilities/helpers";

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';

import { SearchBar } from '../SearchBar';
import { ExportSelect } from "../ExportSelect";
import { OrderSummary } from '../OrderSummary';


export default function OrdersWrapper() {

    const ordersViewOpt = [
        {
            label: "All orders",
            value: 'all'
        },
        {
            label: "Primary orders",
            value: 'primary'
        },
        {
            label: "Secondary orders",
            value: 'secondary'
        },
        {
            label: "Transfers",
            value: 'transfers'
        },
        {
            label: "Refunds",
            value: 'refunds'
        }
    ];

    // demo - orders array that is built from data from database 
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
                    price: 0
                },
                {
                    id: 10002,
                    status: 'transferred',
                    price: 0
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
                    price: 0
                },
                {
                    id: 11114,
                    status: 'transferred',
                    price: 0
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

    const [ordersView, setOrdersView] = useState(ordersViewOpt[0].value);

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

    return (
        <>
            <section className='max-width-wrapper'>
                <header className='section-header'>
                    <div className="section-header">
                        <div className="section-heading">
                            <h1>Orders</h1>
                        </div>
                        <p className='section-header-desc'>See all the orders, refunds and transfers for your event, including gross sales with fees</p>
                    </div>
                    <div className="actions-group-flex">
                        <FloatingLabel controlId="orders" label="Orders">
                            <Form.Select value={ordersView} onChange={(e) => setOrdersView(e.target.value)} aria-label="View Orders">
                                {ordersViewOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by Order #, name, phone number or email" />
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
                        <Link to="refund/all" className='btn btn-outline-light'>Issue multiple refunds</Link>
                    </Stack>
                </header>
                <Stack as="ul" gap={4}>
                    {ordersObj.map((order, index) => (
                        <OrderSummary key={index} order={order} />
                    ))}
                </Stack>
            </section>
        </>
    );
}
