import React from 'react';

import { formatCurrency, formatOrderId } from '../../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

export default function Ticket({ payout }) {

    return (
        <Stack direction='horizontal' as="li" className='list-item payout-row'>
            <Stack>
                <h2 className='normal m-0'>{payout.date}</h2>
            </Stack>
            <Stack gap={1}>
                <p className='fw-semi-bold'>{payout.event}</p>
                <small>Invoice {formatOrderId(payout.invoice)}</small>
            </Stack>
            <Stack gap={1}>
                <span className='fw-semi-bold'>{formatCurrency(payout.price)}</span>
                <Badge bg="default" className='badge-outline badge-outline--dark'>{payout.status}</Badge>
            </Stack>
        </Stack>
    );
}
