import React, { Fragment } from "react";
import { QRCodeSVG } from 'qrcode.react';
import moment from "moment";

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

export default function Tickets({ ticket, order, handleClick }) {
    const eventStart = moment(order.event.start);
    const today = moment();
    const showQR = today.isSame(eventStart, 'day');

    return (
        <Fragment>
            <Card body className="ticket-card">
                {showQR &&
                    <QRCodeSVG
                        width="217"
                        height="217"
                        className="mb-3 p-0"
                        value={ticket.checkInCode}
                    />
                }

                {!showQR &&
                    <Image
                        src="../noqr.png"
                        className="mb-3"
                    />
                }

                <div className="details d-flex-column">
                    <Card.Title as="h5">{order?.event?.name}</Card.Title>
                    <p className="event-details">
                        {moment(order?.event?.start).format('MMM DD')} <span>{moment(order?.event?.start).format('h:mm A')}</span><span className="venue">{order?.event?.venue.name}</span><span className="loc">
                            {order?.event?.venue.address[0]?.city}, {order?.event?.venue.address[0].state}
                        </span>
                    </p>
                    <>
                        <Badge bg="light" className="mt-2 text-dark badge-lg">
                            General Admission
                        </Badge>
                        <Button variant='outline-light' size="xs" onClick={() => handleClick('details')}>Details</Button>
                    </>
                </div>
            </Card>
        </Fragment>
    )
}