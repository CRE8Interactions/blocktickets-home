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

  useEffect(() => {
    getEvent(Number(cart.ticket.eventId))
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
                            <span>{cart?.ticketCount > 1 ? `${cart?.ticketCount } Tickets` : `${cart?.ticketCount } Ticket` }</span>
                            <span>&bull; {cart?.ticket?.resale ? 'Resale' : 'General Admission'}</span>
                        </Stack>
                    </Stack>
                
            </Stack>
        </Card>
	);
}