import React, { useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";

import { formatOrderId, formatCurrency } from '../../utilities/helpers';

import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';

import { MoreIcon } from '../MoreIcon';
import { TicketRow } from './TicketRow'

import './orderSummary.scss';

// could be whole order or single ticket 
export default function OrderSummary({ ticket, order, showDropdown = true }) {

    const { status } = order;

    const [open, setOpen] = useState(false);

    let ticketsObj = ticket ? ticket : order.tickets
    // testing
    // console.log(order.tickets);
    // Object.values(status).map(status => status.map(stat => console.log(stat)))
    // order.tickets.map(ticket => console.log(ticket));

    const calcTotal = (price, numTickets) => {
        return price * numTickets
    }

    const sumOfTickets = tickets => {
        if (tickets.length) {
            return tickets.reduce((prev, cur) => prev + cur.price, 0)
        } else {
            return ticket.price
        }
    }

    return (
        <li>
            <Card body className='order-summary-card'>
                <Button variant="link" className="btn-toggle"
                    onClick={() => setOpen(!open)}
                    aria-controls="order-summary-text"
                    aria-expanded={open}
                >
                    <h1 className='card-body-title'>{formatCurrency(sumOfTickets(ticketsObj))}</h1>
                </Button>
                <Stack direction="horizontal" className='split-row card-body-subtitle--flex'>
                    <Stack direction="horizontal" gap={3}>
                        <p>Order {formatOrderId(order.orderId)}</p>
                        <Badge className={`badge-outline badge-outline--${order.marketType === 'primary' ? 'primary' : 'secondary'}`}>{order.marketType}</Badge>
                    </Stack>
                    {showDropdown && (
                        <Dropdown className="btn-more" align="right">
                            <Dropdown.Toggle variant="default">
                                <MoreIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ul>
                                    <li>
                                        <LinkContainer to={`refund?order=${order.orderId}`}>
                                            <Dropdown.Item className="btn-edit">
                                                Refund order
                                            </Dropdown.Item>
                                        </LinkContainer>
                                    </li>
                                    <li>
                                        <LinkContainer to="attendee-report">
                                            <Dropdown.Item className="btn-edit">
                                                View attendee report
                                            </Dropdown.Item>
                                        </LinkContainer>
                                    </li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Stack>
                <Collapse in={open}>
                    <div id="order-summary-text">
                        <div className={`${Object.values(status).length > 1 ? 'progress-line' : ''} ${order.marketType === 'primary' ? 'progress-line--primary' : 'progress-line--secondary'}`}>
                            {Object.values(status).map(status => status.map((entry, index) => (
                                <Stack gap={1} key={entry.index} className="transaction">
                                    <span className='caption status-label'>{entry.key}:</span>
                                    <div className="transaction-desc">
                                        <p className='fw-medium'>{entry.name}</p>
                                        <span className='caption'>{entry.numTickets} tickets</span>
                                        {entry.price && (<p className='fw-medium'>Total {formatCurrency(calcTotal(entry.price, entry.numTickets))} paid by visa 0578 </p>)}
                                    </div>
                                </Stack>
                            )))}
                        </div>
                        <Table className='mt-4'>
                            <thead>
                                <tr>
                                    <th>Ticket Buyer</th>
                                    <th>Quantity</th>
                                    <th>Market type</th>
                                    <th>Transaction type</th>
                                    <th>Ticket type</th>
                                    <th>Paid</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticket ? (
                                    <TicketRow orderId={order.orderId} ticket={ticket} ticketBuyer={`${order.ticketBuyer.firstName} ${order.ticketBuyer.lastName}`} marketType={order.marketType} type={order.ticketType} />
                                ) : (
                                    order.tickets.map((ticket) => (
                                        <TicketRow key={order.orderId} orderId={order.orderId} ticket={ticket} ticketBuyer={`${order.ticketBuyer.firstName} ${order.ticketBuyer.lastName}`} marketType={order.marketType} type={order.ticketType} />
                                    ))
                                )}
                                <tr className='total-row'>
                                    <td colSpan={5}>Total</td>
                                    <td className='text-center'>{formatCurrency(sumOfTickets(ticketsObj))}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Collapse>

            </Card>
        </li>
    );
}
