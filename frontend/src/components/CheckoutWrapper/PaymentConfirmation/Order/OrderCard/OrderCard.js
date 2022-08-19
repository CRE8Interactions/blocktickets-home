import React from 'react';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

export default function OrderCard({ order }) {
    return (
        <Card body className="card--light order-card">
            <Stack direction="horizontal" gap={3}>
                <img
                    src={order?.event?.image?.url}
                    alt={order?.event?.name}
                    width="64"
                    height="64"
                    className="event-image"
                />
                <Stack className="details">
                    <h1 className="event-name fw-bold">{order?.event?.name}</h1>
                    <p>
                        {moment(order?.event?.start).format('ddd, MMM DD YYYY')} <span className="time">{moment(order?.event?.start).format('h:mm A')} EST</span>
                    </p>
                    <p>
                        {order?.event?.venue?.name}<span className="loc">
                            {order?.event?.venue?.address[0]?.city}, {order?.event?.venue?.address[0]?.state}
                        </span>
                    </p>
                    <p className="tickets">
                        <span>{order.tickets.length} {order.tickets.length > 1 ? 'Tickets' : 'Ticket'}</span>
                        <span className='ticket-type'>{order.tickets[0]?.resale ? `Resale • General Admission` : `General Admission`}</span>
                    </p>
                </Stack>
            </Stack>
        </Card>
    );
}