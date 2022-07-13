import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { formatCurrency, formatNumber } from "./../../utilities/helpers";

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { SearchBar } from '../SearchBar';
import { OrderSummary } from '../OrderSummary';

import './ordersWrapper.scss'

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

    const exportOpt = [
        {
            label: "Excel",
            value: 'excel'
        },
        {
            label: "CVC",
            value: 'cvc'
        },

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

    const [ordersView, setOrdersView] = useState('completed');

    const [exportTo, setExportTo] = useState('excel')

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleSearch = (query) => { }

    return (
        <>
            <section>
                <header>
                    <div className="section-header">
                        <div className="section-heading">
                            <h1>Orders</h1>
                        </div>
                        <p className='section-header-desc'>See all the orders, refunds and transfers for your event, including gross sales with fees</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center" id="orders-header">
                        <FloatingLabel controlId="orders" label="Orders">
                            <Form.Select value={ordersView} onChange={(e) => setOrdersView(e.target.value)} aria-label="View Orders">
                                {ordersViewOpt.map(option => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by Order #, name, phone number or email" />
                        <InputGroup id="export-group">
                            <FloatingLabel controlId="export" label="Export">
                                <Form.Select value={exportTo} onChange={(e) => setExportTo(e.target.value)}>
                                    {exportOpt.map(option => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                            <Button variant="outline-light" className='justify-content-center align-items-center' id="download-btn">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.002 5.49957C13.002 4.94729 12.5543 4.49957 12.002 4.49957C11.4497 4.49957 11.002 4.94729 11.002 5.49957V13.5858L8.20906 10.7929C7.81854 10.4024 7.18537 10.4024 6.79485 10.7929C6.40432 11.1834 6.40432 11.8166 6.79485 12.2071L10.5878 16C11.3688 16.7811 12.6352 16.7811 13.4162 16L17.2072 12.209C17.5977 11.8185 17.5977 11.1854 17.2072 10.7948C16.8167 10.4043 16.1835 10.4043 15.793 10.7948L13.002 13.5858V5.49957Z" fill="#777E91" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4 14.5C4.55228 14.5 5 14.9477 5 15.5V17.5C5 18.0523 5.44772 18.5 6 18.5H18C18.5523 18.5 19 18.0523 19 17.5V15.5C19 14.9477 19.4477 14.5 20 14.5C20.5523 14.5 21 14.9477 21 15.5V17.5C21 19.1569 19.6569 20.5 18 20.5H6C4.34315 20.5 3 19.1569 3 17.5V15.5C3 14.9477 3.44772 14.5 4 14.5Z" fill="#777E91" />
                                </svg>
                            </Button>
                        </InputGroup>
                    </div>
                </header>
                <Stack direction="horizontal" className='my-4 split-row'>
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
                <Stack as="ul" gap={4}>
                    {ordersObj.map((order, index) => (
                        <OrderSummary key={index} order={order} />
                    ))}
                </Stack>
            </section>
        </>
    );
}
