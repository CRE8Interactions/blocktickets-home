import React, { useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import moment from 'moment';

import { capitalizeString, formatOrderId, formatCurrency } from '../../utilities/helpers';

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
export default function OrderSummary({ ticket, order, showDropdown = true, isOpen = false }) {
    const { status, refund } = order;

    const [open, setOpen] = useState(isOpen);

    let ticketArr = ticket ? [ticket] : order.tickets;

    const sumOfTickets = tickets => {
        return tickets?.reduce((prev, cur) => prev + cur.price, 0)
    }

    const orderType = (order) => {
        let type = order?.type === 'resale' ? 'secondary' : 'primary';
        return type
    }

    const purchaseType = (order) => {
        let type = order?.type === 'resale' ? 'secondary' : 'primary';
        return 'Purchased By'
    }

    const purchaser = (order) => {
        return `${order?.users_permissions_user?.firstName} ${order?.users_permissions_user?.lastName} on ${moment(order?.processedAt).format('MMM DD, YYYY')} at ${moment(order?.processedAt).format('h:mma')} EST`
    }

    return (
        <li>
            <Card body className='order-summary-card'>
                <Button variant="link" className="btn-toggle"
                    onClick={() => setOpen(!open)}
                    aria-controls="order-summary-text"
                    aria-expanded={open}
                >
                    <h1 className='card-body-title'>{formatCurrency(order?.total)}</h1>
                </Button>
                <Stack direction="horizontal" className='split-row card-body-subtitle--flex'>
                    <Stack direction="horizontal" gap={3}>
                        <p>Order {formatOrderId(order?.uuid)}</p>
                        <Badge bg="default" className={`badge-outline badge-outline--${orderType(order)}`}>{orderType(order)}</Badge>
                    </Stack>
                    {showDropdown && (
                        <Dropdown className="btn-more" align="right">
                            <Dropdown.Toggle variant="default">
                                <MoreIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Stack as="ul" gap={2}>
                                    {!refund && (
                                        <li>
                                            <LinkContainer to={`refund?order=${order?.uuid}`}>
                                                <Dropdown.Item className="btn-refund">
                                                    Refund order
                                                </Dropdown.Item>
                                            </LinkContainer>
                                        </li>
                                    )}
                                    <li>
                                        <LinkContainer to={`attendees-report?order=${order?.uuid}`}>
                                            <Dropdown.Item className="btn-view">
                                                View attendees report
                                            </Dropdown.Item>
                                        </LinkContainer>
                                    </li>
                                </Stack>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Stack>
                <Collapse in={open}>
                    <div id="order-summary-text">
                        <Stack gap={1} key={order.orderId} className="transaction">
                            <span className='caption status-label'>{purchaseType(order)}:</span>
                            <div className="transaction-desc">
                                <p className='fw-medium'>{capitalizeString(purchaser(order))}</p>
                                <span className='caption'>{order?.details?.ticketCount} tickets</span>
                                {status.key !== 'Transferred by' && (<p className='fw-medium'>Total {formatCurrency(order?.total / order?.details?.ticketCount)} paid by {order?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.brand} {order?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.last4} </p>)}
                            </div>
                            {refund && (
                                <Stack gap={1} className='mt-2'>
                                    <p>Refunded on {refund.date}</p>
                                    <p>{formatCurrency(order?.total)} refunded to original payment method</p>
                                </Stack>
                            )}
                        </Stack>

                        <Table className='mt-4'>
                            <thead>
                                <tr>
                                    <th>Ticket Buyer</th>
                                    <th>Quantity</th>
                                    <th>Market type</th>
                                    <th>Transaction type</th>
                                    <th>Ticket type</th>
                                    <th>Paid</th>
                                    {showDropdown && (<th>Action</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(order?.details?.ticketCount)].map((x, i) => {
                                    return <TicketRow key={i} orderId={order.uuid} ticket={order?.details?.ticket} ticketBuyer={`${order?.users_permissions_user?.firstName} ${order?.users_permissions_user?.lastName}`} marketType={orderType(order?.type)} type={order?.type} show={showDropdown} refund={refund} order={order} />
                                })}
                                <tr className='total-row'>
                                    <td colSpan={5}>Total</td>
                                    <td className={`${showDropdown ? 'text-center' : 'text-end'}`}>{formatCurrency(order?.total)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Collapse>

            </Card>
        </li >
    );
}
