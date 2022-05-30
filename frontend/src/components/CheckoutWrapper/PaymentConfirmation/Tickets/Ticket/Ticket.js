import React from 'react';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import './ticket.scss';

export default function Ticket({order}) {
	return (
		<Card body className="card--light" id="order-card">
            <Stack direction="horizontal" gap={3}>
                    <img
                        src={order?.event?.image?.url}
                        alt={order?.event?.name}
                        width="64"
                        height="64"
                        className="event-image"
                    />
                    <Stack className="d-flex flex-column details" >
                        <h1 className="event-name fw-bold">{order?.event?.name}</h1>
                        <p className="small">
                        {moment(order?.event?.start).format('MMM DD')} <span className="time">{moment(order?.event?.start).format('h:mm A')} EST</span>
                        </p>
                        <p className="small">
                            {order?.event?.venue?.name}<span className="loc">
                            {order?.event?.venue?.address[0]?.city}, {order?.event?.venue?.address[0]?.state}
                            </span>
                        </p>
                        <Stack direction='horizontal' gap={1}>
                            <span>{order.tickets.length} Tickets</span>
                            <span>&bull; General Admission</span>
                        </Stack>
                    </Stack>
                
            </Stack>
        </Card>
	);
}
