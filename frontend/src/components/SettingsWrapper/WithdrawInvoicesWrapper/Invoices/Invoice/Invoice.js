import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';

import logo from '../../../../../assets/logo.svg';

import './invoice.scss';

export default function Invoice() {
    return (
        <div id="invoice">
            <Row as="header">
                <Col md={6}>
                    <Image
                        src={logo}
                        className="mb-4"
                        alt="blocktickets"
                    />
                </Col>
                <Col md={6}>
                    <Stack className="align-items-end fw-semi-bold">
                        <small className='text-uppercase d-block'>Invoice</small>
                        <small className='text-muted tiny fw-normal'>This is not a ticket. This cannot be used for entry.</small>
                    </Stack>
                </Col>
            </Row>
            <div className="mt-4">
                <Row className="mb-4">
                    <Col md={6} className="mb-4">
                        <h2 className='text-muted mb-2 caption'>Event</h2>
                        <ul>
                            <li>
                                <p><strong>Pete Davidson Live</strong></p>
                                <ul className='caption'>
                                    <li>Fri, Sep 3 2022 <span className='time'>9:00 PM EST</span></li>
                                    <li>Madison Square Garden</li>
                                    <li>Toronto, ON</li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h2 className='text-muted mb-2 caption'>Attendee</h2>
                        <ul>
                            <li>
                                <span><strong>Harrison Cogan</strong></span>
                                <ul className="caption">
                                    <li>Payment information: American Express</li>
                                    <li>Charge: $81.25</li>
                                    <li>Last 4 digiits: 3411</li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className='caption mb-4'>
                    <p><span className='fw-semi-bold'>Order No.: 1933-133924-6690</span></p>
                    <p><span className='fw-semi-bold'>Order Date: Aug 12th, 2022</span></p>
                </div>
                <Card body>
                    <h1 className='caption fw-semi-bold mb-3'>Ticket/s Details</h1>
                    <ul className="ticket-details">
                        <li><span>Section</span>General Admission</li>
                        <li ><span>Row</span>-</li>
                        <li><span>Seat</span>-</li>
                    </ul>
                </Card>
                <ListGroup as="ul" className="mt-4">
                    <ListGroup.Item as="li">
                        <div className="split-row">
                            <h1 className="normal">4x Ticket/s</h1>
                            <span className='fw-bold'>$130.00</span>
                        </div>
                        <ul>
                            <li className='list-item'>
                                $32.50 x 4
                            </li>
                        </ul>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                        <div className="split-row">
                            <h1 className="normal">Fees</h1>
                            <span className='fw-bold'>$13.00</span>
                        </div>
                        <ul>
                            <li className='list-item'>
                                $3.00 (Facility Charge)
                            </li>
                            <li className='list-item'>
                                $10.00 (Service Charge)
                            </li>
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
                <div className="split-row total-row">
                    <span>Total</span>
                    <span>$143.00</span>
                </div>
            </div>
        </div>
    );
}
