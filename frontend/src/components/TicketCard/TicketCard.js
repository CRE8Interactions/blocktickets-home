import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TicketModal } from '../TicketModal';

import './ticketCard.scss';

export default function TicketCard({ id, ticketType, ticketStatus, ticketState, order, tickets, listing, removeListing, getListings }) {
    const [
        ticketAction,
        setTicketAction
    ] = useState('');

    const [
        show,
        setShow
    ] = useState(false);

    const handleShow = () => setShow(true);

    const handleClick = (action) => {
        handleShow();
        setTicketAction(action)
    };

    const event = listing ? listing?.event : order?.event;

    if (listing) {
        order = {}
        order['event'] = listing?.event;
        order['orderId'] = listing?.uuid;
    }
    useEffect(() => {
    }, [ticketState, ticketStatus])

    return (
        <Fragment>
            <Card body className="ticket-card">
                <Card.Img
                    src={event?.image.url}
                    width="217"
                    height="217"
                    className="event-image-lg mb-3"
                />
                <div className="details d-flex-column">
                    <Card.Title as="h5">{event?.name}</Card.Title>
                    <p className="event-details">
                        {moment(event?.start).format('MMM DD')} <span>{moment(event?.start).format('h:mm A')}</span><span className="venue">{event?.venue.name}</span><span className="loc">
                            {event?.venue.address[0]?.city}, {event?.venue.address[0].state}
                        </span>
                    </p>

                    {!id && (<span className="num-tickets">{listing ? listing.tickets.length : order?.tickets.length} {listing?.tickets.length > 1 || order?.tickets.length > 1 ? 'Tickets' : 'Ticket'} </span>
                    )}

                    <>
                        {ticketState &&
                            (
                                <>
                                    <Stack className='mb-2'>
                                        <Stack direction="horizontal" className="split-row mb-1">
                                            <span className='m-0 caption'>Listing price per ticket</span>
                                            <span className='text-end fw-medium'>${(listing?.askingPrice).toFixed(2)}</span>
                                        </Stack>
                                        <p className='caption text-muted'>You will make ${(listing?.askingPrice / listing?.tickets.length).toFixed(2) - listing?.tickets[0].facilityFee} per ticket</p>
                                    </Stack>
                                </>
                            )
                        }

                        {id || ticketStatus ? (<Badge bg="light" className="mt-2 text-dark badge-lg">
                            General Admission
                        </Badge>) : ''}

                        {ticketState && ticketState === 'active' &&
                            (
                                <>
                                    <Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
                                        <Button onClick={(e) => handleClick('remove')}>Remove listing</Button>
                                        <Button onClick={(e) => handleClick('edit')} variant="outline-light" size="xs">Edit</Button>
                                    </Stack>
                                </>
                            )
                        }

                        {id || (ticketState && ticketState !== "active") ? (
                            <Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
                                {/* <Button variant="info" id="apple-wallet-btn" aria-label="Add to Apple Wallet" className="br-lg"> 
                                </Button> */}
                                <Button variant='outline-light' size="xs" onClick={() => handleClick('details')}>Details</Button>
                            </Stack>
                        ) : ''}

                        {
                            !id && !ticketStatus &&
                            (
                                <Link to={`/event-details/${order?.orderId}`} className="btn btn-primary">
                                    Event details
                                </Link>
                            )
                        }
                    </>
                </div>
            </Card>
            <TicketModal ticketAction={ticketAction} show={show} setShow={setShow} order={order} removeListing={removeListing} listing={listing} getListings={getListings} />
        </Fragment>
    );
}
