import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { formatCurrency, formatOrderId } from "./../../utilities/helpers";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { SearchBar } from '../SearchBar';
import { RefundModal } from '../RefundModal';

import './refundOrdersWrapper.scss';

export default function RefundOrdersWrapper() {

    const [show, setShow] = useState(false);

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

    const [orderCount, setOrderCount] = useState(0)

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

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const orders = ordersObj.map(order => ({
        id: order.orderId,
        tickets: order.totalTickets,
        paid: order.tickets.reduce((prev, cur) => prev + cur.price, 0)
    }))

    const columns = [
        {
            dataField: 'id',
            text: 'Order ID',
            formatter: (cell) => {
                return <><ul className='text-start ps-3'><li className='fw-medium mb-1'>Order {formatOrderId(cell)}</li><li className='caption '>Purchased on Jan 22, 2022</li><li className='caption'>Buyer: Cruz Poeppelman</li></ul></>
            }
        },
        {
            dataField: 'tickets',
            text: 'Tickets Sold'
        },
        {
            dataField: 'paid',
            text: 'Paid',
            formatter: (cell) => {
                return formatCurrency(cell)
            }
        },
        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'refund',
            text: 'Refund type'
        }
    ];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#F4F5F6',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setOrderCount(orderCount + 1)
            } else { setOrderCount(orderCount - 1) }
        },
        onSelectAll: (isSelect, rows) => {
            if (isSelect) {
                setOrderCount(ordersObj.length)
            }
            else {
                setOrderCount(0)
            }
        },
        selectionRenderer: (props) => (
            <input
                type={props.mode}
                checked={props.checked}
                onChange={() => console.log('change')}
                className="custom-check"
            />
        )
    }

    return (
        <>
            <section className='max-width-wrapper' id="refund-orders">
                <header className='section-header'>
                    <div className="section-header">
                        <div className="section-heading">
                            <h1>Multiple refunds</h1>
                        </div>
                        <p className='section-header-desc'>Issue refunds for orders sold through Blocktickets Payment Processing. Blocktickets will refund all fees.
                            You and your attendees will each receive an email for each completed refund</p>
                    </div>
                    <div className="actions-group-flex" id="refund-orders-header">
                        <Card body className="card--xs">
                            <span className='caption-label'>Orders selected</span>
                            <span>{orderCount} / {Object.values(ordersObj).length}</span>
                        </Card>
                        <Card body className="card--xs amount-card">
                            <span className='caption-label'>Amount to refund in USD</span>
                            <span>{formatCurrency(120)}</span>
                        </Card>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by Order #, date, buyer" />
                    </div>
                    <Stack direction="horizontal" gap={3} className="my-3">
                        <span className='small text-muted fw-medium'>Refund method</span>
                        <span className='small'>Original payment method</span>
                    </Stack>
                </header>
                <div>
                    <div className='heading--flex section-header split-row'>
                        <h1 className='fs-md'>Orders</h1>
                        <Button size="lg" onClick={handleShow} disabled={orderCount == 0}>Refund selected</Button>
                    </div>
                    <Card body>
                        <BootstrapTable
                            keyField='id'
                            data={orders}
                            columns={columns}
                            selectRow={selectRow}
                            hover
                            bordered={false}
                        />
                    </Card>
                </div>
            </section>

            <RefundModal show={show} handleClose={handleClose} />
        </>
    );
}
