import React, { Fragment } from "react";
import { QRCodeSVG } from 'qrcode.react';
import moment from "moment";

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Tickets({ticket, order}) {
  console.log(ticket)
  console.log(order)
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
                      <Stack className='mb-2'>
                          <Stack direction="horizontal" className="split-row mb-1">
                              <span className='m-0 caption'></span>
                              <span className='text-end fw-medium'></span>
                          </Stack>
                          <p className='caption text-muted'></p>
                      </Stack>
                    </>
                </div>
            </Card>
        </Fragment>
  )
}