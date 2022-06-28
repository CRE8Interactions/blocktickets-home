import React, { Fragment } from "react";
import { QRCodeSVG } from 'qrcode.react';
import moment from "moment";

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Tickets({ticket, order, handleClick}) {
  return (
    <Fragment>
            <Card body className="ticket-card">
                <QRCodeSVG
                  width="217"
                  height="217"
                  className="mb-3 p-0"
                  value={ticket.checkInCode}
                />
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