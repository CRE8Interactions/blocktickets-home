import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

import './ticketBreakdown.scss';

export default function TicketBreakdownModal({ show, handleClose }) {
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
                                <span>$40.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Service Fee</span>
                                <span>$2.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Facility Fee</span>
                                <span>$3.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Processing Fee</span>
                                <span>$3.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Tax</span>
                                <span>$5.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="mt-2 split-row">
                                <span className='fw-medium'>Total</span>
                                <span className='fw-medium'>$57.00</span>
                            </Stack>
                        </ul>
                    </li>
                    <li className='list list-with-seperator'>
                        <p className='heading'>Your payout</p>
                        <ul>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Ticket revenue</span>
                                <span>$40.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="split-row">
                                <span>Facility Fee</span>
                                <span>$2.00</span>
                            </Stack>
                            <Stack as="li" direction="horizontal" className="mt-2 split-row">
                                <span className='fw-medium'>Total</span>
                                <span className='fw-medium'>$43.00</span>
                            </Stack>
                        </ul>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>

    );
}
