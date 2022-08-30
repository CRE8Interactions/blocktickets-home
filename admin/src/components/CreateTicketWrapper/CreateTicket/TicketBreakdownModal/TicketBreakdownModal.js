import React, { useEffect, useState } from 'react';

import { formatCurrency } from "./../../../../utilities/helpers";

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

import './ticketBreakdown.scss';

export default function TicketBreakdownModal({ show, handleClose, ticket }) {

    const [totals, setTotals] = useState();

    useEffect(() => {
        setTotals(parseFloat(ticket?.price) + parseFloat(ticket?.fee) + 2 + 3 + 5)
    }, [ticket])

    return (
        <Modal id="ticket-breakdown" centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Ticket breakdown</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li className='list list-with-seperator'>
                        <p className='heading'>Cost to buyer</p>
                        <ul>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Ticket price</span>
                                <span>{formatCurrency(ticket?.price)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Service Fee</span>
                                <span>{formatCurrency(2)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Facility Fee</span>
                                <span>{formatCurrency(ticket?.fee)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Processing Fee</span>
                                <span>{formatCurrency(3)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Tax</span>
                                <span>{formatCurrency(5)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="mt-2 split-row">
                                <span className='fw-medium'>Total</span>
                                <span className='fw-medium'>{formatCurrency(totals)}</span>
                            </Stack>
                        </ul>
                    </li>
                    <li className='list list-with-seperator'>
                        <p className='heading'>Your payout</p>
                        <ul>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Ticket revenue</span>
                                <span>${parseFloat(ticket?.price).toFixed(2)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Facility Fee</span>
                                <span>${parseFloat(ticket?.fee).toFixed(2)}</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="mt-2 split-row">
                                <span className='fw-medium'>Total</span>
                                <span className='fw-medium'>${(parseFloat(ticket?.price) + parseFloat(ticket?.fee)).toFixed(2)}</span>
                            </Stack>
                        </ul>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>

    );
}
