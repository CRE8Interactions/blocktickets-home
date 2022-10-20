import React, { useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import moment from 'moment';

import { capitalizeString, formatCurrency, formatDateTime } from '../../utilities/helpers';

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

// component used on orders page and refund orders page
export default function OrderSummary({ order, showDropdown = true, isOpen = false, hasPermission }) {
    const { status, refund } = order;

    const [open, setOpen] = useState(isOpen);

    const orderType = (order) => {
        let type = order?.type === 'resale' ? 'secondary' : 'primary';
        return type
    }

    const purchaseType = (order) => {
        let type = order?.type === 'resale' ? 'secondary' : 'primary';
        return 'Purchased By'
    }

    const purchaser = (order) => {
        return `${capitalizeString(`${order?.users_permissions_user?.firstName} ${order?.users_permissions_user?.lastName}`)} ${formatDateTime(moment(order?.processedAt))}`
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
                        <p>Order {order?.orderId}</p>
                        <Badge bg="default" className={`badge-outline badge-outline--${orderType(order)}`}>{orderType(order)}</Badge>
                    </Stack>
                    {showDropdown && (
                        <Dropdown className="btn-more" drop="start">
                            <Dropdown.Toggle variant="default">
                                <MoreIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Stack as="ul" gap={2}>
                                    {!refund && (
                                        <li>
                                            <LinkContainer to={`refund?order=${order?.uuid}`}>
                                                <Dropdown.Item className={`btn-refund ${!hasPermission && 'btn-link-disabled'} `}>
                                                    Refund tickets
                                                </Dropdown.Item>
                                            </LinkContainer>
                                        </li>
                                    )}
                                    <li>
                                        <LinkContainer to={`attendees-list?order=${order?.uuid}`}>
                                            <Dropdown.Item className="btn-view">
                                                View attendees list
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
                                <p className='fw-medium'>{purchaser(order)}</p>
                                <span className='caption'>{order?.details?.ticketCount} tickets</span>
                                {status.key !== 'Transferred by' && (<p className='fw-medium'>Total {formatCurrency(order?.total / order?.details?.ticketCount)}
                                    {!order?.details?.ticket.free && (
                                        <span> paid by {order?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.brand} {order?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.last4}</span>
                                    )}
                                </p>)}
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
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(order?.details?.ticketCount)].map((x, i) => {
                                    return <TicketRow key={i} ticket={order?.details?.ticket} ticketBuyer={`${order?.users_permissions_user?.firstName} ${order?.users_permissions_user?.lastName}`} marketType={orderType(order?.type)} order={order} />
                                })}
                                <tr className='total-row'>
                                    <td colSpan={5}>Total</td>
                                    <td className='text-end'>{formatCurrency(order?.total)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Collapse>
            </Card>
        </li>
    );
}
