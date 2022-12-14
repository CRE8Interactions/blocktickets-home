import React from 'react';
import * as moment from 'moment';

import { formatDateTime, formatShortAddress } from '../../../../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import placeholder from '../../../../../assets/placeholder.png';

export default function OrderCard({ order }) {
    return (
        <Card body className="card--light order-card">
            <Stack direction="horizontal" gap={3}>
                <img
                    src={order?.event?.image?.url || placeholder}
                    alt={order?.event?.name}
                    width="64"
                    height="64"
                    className="event-image"
                />
                <Stack className="details">
                    <h1 className="event-name fw-bold">{order?.event?.name}</h1>
                    <p>
                        {formatDateTime(moment(order?.event?.start), 'dateOnly')}
                        {order?.event?.display_start_time && (
                            <span className="time">{formatDateTime(moment(order?.event?.start), 'timeOnly')}</span>
                        )}

                    </p>
                    <p>
                        {order?.event?.venue?.name}<span className="loc">
                            {formatShortAddress(order?.event)}
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
