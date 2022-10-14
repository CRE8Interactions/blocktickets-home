import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moment from 'moment';

import { formatDateTime, formatCurrency, capitalizeString } from '../../../../../utilities/helpers';

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';

import logo from '../../../../../assets/logo.svg';

import './invoice.scss';

export default function Invoice({ details }) {

    const [invoice, setInvoice] = useState()

    const { id } = useParams();

    useEffect(() => {
        if (!details) return
        let currInvoice = details.find(d => d.id == id)
        setInvoice(currInvoice)
    }, [details])

    return (
        <div id="invoice" className='docs-container'>
            <header className="d-flex">
                <div className='col'>
                    <Image
                        src={logo}
                        className="mb-4"
                        alt="blocktickets"
                    />
                </div>
                <div className='col'>
                    <Stack className="align-items-end fw-semi-bold">
                        <small className='text-uppercase d-block'>Invoice</small>
                        <small className='text-muted tiny fw-normal'>This is not a ticket. This cannot be used for entry.</small>
                    </Stack>
                </div>
            </header>
            <div className="mt-4">
                <div className="mb-4 invoice-header">
                    <div className="col mb-4">
                        <h2 className='text-muted mb-2 caption'>Event</h2>
                        <ul>
                            <li>
                                <p><strong>{invoice?.event?.name}</strong></p>
                                <ul className='caption'>
                                    <li>{formatDateTime(moment(invoice?.event?.start), 'dateOnly')}<span className='time'>{formatDateTime(moment(invoice?.event?.start), 'timeOnly')}</span></li>
                                    <li>{capitalizeString(invoice?.event?.venue?.name)}</li>
                                    <li>{capitalizeString(invoice?.event?.venue?.address[0]?.city)}, {invoice?.event?.venue?.address[0]?.state?.toUpperCase()}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2 className='text-muted mb-2 caption'>Attendee</h2>
                        <ul>
                            <li>
                                <span><strong>{capitalizeString(invoice?.users_permissions_user?.firstName)} {capitalizeString(invoice?.users_permissions_user?.lastName)}</strong></span>
                                <ul className="caption">
                                    <li>Payment information: {capitalizeString(invoice?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.brand)}</li>
                                    <li>Charge: {formatCurrency(invoice?.intentDetails?.charges?.data[0]?.amount / 100)}</li>
                                    <li>Last 4 digiits: {invoice?.intentDetails?.charges?.data[0]?.payment_method_details?.card?.last4}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='caption mb-4'>
                    <p><span className='fw-semi-bold'>Order No.: {invoice?.orderId}</span></p>
                    <p><span className='fw-semi-bold'>Order Date: {formatDateTime(moment(invoice?.processedAt), 'dateOnly')}</span></p>
                </div>
                <Card body>
                    <h1 className='caption fw-semi-bold mb-3'>Ticket/s Details</h1>
                    <ul className="ticket-details">
                        <li><span>Section</span>{invoice?.details?.ticket?.name}</li>
                        <li ><span>Row</span>-</li>
                        <li><span>Seat</span>-</li>
                    </ul>
                </Card>
                <ListGroup as="ul" className="mt-4">
                    <ListGroup.Item as="li">
                        <div className="split-row">
                            <h1 className="normal">{invoice?.details?.ticketCount}x Ticket/s</h1>
                            <span className='fw-bold'>{formatCurrency(invoice?.details?.ticket?.cost * invoice?.details?.ticketCount)}</span>
                        </div>
                        <ul>
                            <li className='list-item'>
                                {formatCurrency(invoice?.details?.ticket?.cost)} x {invoice?.details?.ticketCount}
                            </li>
                        </ul>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                        <div className="split-row">
                            <h1 className="normal">Fees</h1>
                            <span className='fw-bold'>{formatCurrency(invoice?.total - (invoice?.details?.ticket?.cost * invoice?.details?.ticketCount))}</span>
                        </div>
                        <ul>
                            <li className='list-item'>
                                {formatCurrency(invoice?.details?.feeDetails?.facilityFee * invoice?.details?.ticketCount)} (Facility Charge)
                            </li>
                            <li className='list-item'>
                                {formatCurrency(invoice?.details?.feeDetails?.serviceFees * invoice?.details?.ticketCount)} (Service Charge)
                            </li>
                            <li className='list-item'>
                                {formatCurrency(invoice?.details?.feeDetails?.paymentProcessingFee * invoice?.details?.ticketCount)} (Processing Charge)
                            </li>
                            <li className='list-item'>
                                {formatCurrency(invoice?.details?.feeDetails?.tax)} (Tax)
                            </li>
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
                <div className="split-row total-row">
                    <span>Total</span>
                    <span>{formatCurrency(invoice?.total)}</span>
                </div>
            </div>
        </div>
    );
}
