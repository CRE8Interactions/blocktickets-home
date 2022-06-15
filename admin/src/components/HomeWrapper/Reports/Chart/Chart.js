import React from 'react';

import { formatCurrency, formatNumber } from '../../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';

import { StatRow } from '../../../StatRow';

export default function Chart({ title, total, amount, stat, statAmount, text, sales }) {

    return (
        <div id="reports">
            <Stack direction="horizontal" className="split-row">
                <Stack>
                    <h1 className='fs-md'>{title}</h1>
                    <StatRow bg={true} stat={stat} statAmount={statAmount} text={`vs ${text}`} />
                </Stack>
                <Stack className='text-end' gap={1}>
                    <span className='fw-semi-bold fs-md'>{total ? `${formatCurrency(total)}` : `${formatNumber(amount)}`}</span>
                    <span className="fw-semi-bold text-muted">{sales}</span>
                </Stack>
            </Stack>
        </div>
    );
}
