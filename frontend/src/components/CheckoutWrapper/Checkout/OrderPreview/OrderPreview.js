import React, { useEffect, useState } from 'react';
import * as moment from 'moment';

import { getEvent } from '../../../../utilities/api';
import { formatDateTime, formatShortAddress } from '../../../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import placeholder from '../../../../assets/placeholder.png';

export default function OrderPreview() {
    const [data, setData] = useState()
    let cart = sessionStorage.getItem('cart');
    if (cart) cart = JSON.parse(cart);

    let eventId;
    let ticketCount;
    let ticketType;

    if (cart.listing) { eventId = cart.listing.event.uuid; ticketCount = cart.listing.tickets.length; ticketType = 'Resale • General Admission' };
    if (cart.ticket) { eventId = cart.ticket.eventId; ticketCount = cart?.ticketCount; ticketType = cart.ticket?.resale ? 'Resale • General Admission' : 'General Admission' }

    useEffect(() => {
        getEvent(eventId)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <Card body className="order-card card--light">
            <Stack direction="horizontal" gap={3}>
                <img
                    src={data?.image?.url || placeholder}
                    alt={data?.name}
                    width="64"
                    height="64"
                    className="event-image"
                />
                <Stack className="details">
                    <h1 className="event-name fw-bold">{data?.name}</h1>
                    <p>
                        {formatDateTime(moment(data?.start), 'dateOnly')}{data?.display_start_time && (
                            <span className="time">{formatDateTime(moment(data?.start), 'timeOnly')}</span>
                        )}
                    </p>
                    <p>
                        {data?.venue?.name}<span className="loc">
                            {formatShortAddress(data)}
                        </span>
                    </p>
                    <p className='tickets'>{ticketCount > 1 ? `${ticketCount} Tickets` : `${ticketCount} Ticket`}<span className='ticket-type'>{ticketType}</span></p>
                </Stack>

            </Stack>
        </Card>
    );
}