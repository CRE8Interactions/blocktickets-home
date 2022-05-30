import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { getEvent } from '../../../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import './styles.scss';

export default function OrderPreview({purchase}) {
  const [data, setData] = useState()
  let cart = sessionStorage.getItem('cart');
	if (cart) cart = JSON.parse(cart);

  let eventId;
  let ticketCount;
  let ticketType;

  if (cart.listing) { eventId = cart.listing.event.id; ticketCount = cart.listing.tickets.length; ticketType = 'Resale' };
  if (cart.ticket) { eventId = cart.ticket.eventId; ticketCount = cart?.ticketCount; ticketType = cart.ticket?.resale ? 'Resale' : 'General Admission' }

  useEffect(() => {
    getEvent(Number(eventId))
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

	return (
		<Card body className="card--light" id="order-card">
            <Stack direction="horizontal" gap={3}>
                    <img
                        src={data?.image?.url}
                        alt={data?.name}
                        width="64"
                        height="64"
                        className="event-image"
                    />
                    <Stack className="d-flex flex-column details" >
                        <h1 className="event-name fw-bold">{data?.name}</h1>
                        <p className="small">
                        {moment(data?.start).format('MMM DD')} <span className="time">{moment(data?.start).format('h:mm A')} EST</span>
                        </p>
                        <p className="small">
                            {data?.venue?.name}<span className="loc">
                            {data?.venue?.address[0]?.city}, {data?.venue?.address[0]?.state}
                            </span>
                        </p>
                        <Stack direction='horizontal' gap={1}>
                            <span>{ticketCount > 1 ? `${ticketCount } Tickets` : `${ticketCount } Ticket` }</span>
                            <span>&bull; {ticketType}</span>
                        </Stack>
                    </Stack>
                
            </Stack>
        </Card>
	);
}