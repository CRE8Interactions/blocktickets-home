import React, { useEffect } from 'react';

import { formatCurrency } from '../../../../utilities/helpers';

import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

import './orderSummary.scss';

export default function OrderSummary({ order }) {
    let sum;
    let fees;
    let tax;
    let total;

    if (order.details.listing) {
        sum = (order?.details?.listing?.pricing?.listingTotal).toFixed(2);
        tax = order?.details?.listing?.pricing?.taxPerTicket * order?.details?.listing?.quantity;
        fees = (order?.details?.listing?.pricing?.totalFees * order?.details?.listing?.quantity - tax).toFixed(2);
        total = order?.details?.listing?.pricing?.listingTotalWithFees;
    } else if (order.details) {
        sum = (order.details?.ticket?.pricing?.ticketCost * order.details?.ticketCount).toFixed(2)
        fees = order.details?.ticket?.pricing?.feesWithoutTax * order.details?.ticketCount;
        tax = order.details?.ticket?.pricing?.taxPerTicket * order.details?.ticketCount;
        total = order.details?.ticket?.pricing?.ticketCostWithFeesAndTax * order.details?.ticketCount;
    }

    useEffect(() => {
    }, [order])


    return (
        <ListGroup as="ul" variant="flush" id="order">
            <ListGroup.Item as="li" className="list">
                <Stack direction="horizontal" className="split-row">
                    <span>Payment</span>
                    <span className='text-end'></span>
                </Stack>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="list">
                <ul>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Subtotal</span>
                        <span className='text-end'>{formatCurrency(sum)}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Fees</span>
                        <span className='text-end'>{sum == 0 ? formatCurrency(0) : formatCurrency(fees)}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Tax</span>
                        <span className='text-end'>{sum == 0 ? formatCurrency(0) : formatCurrency(tax)}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Total</span>
                        <span className='text-end'>{sum == 0 ? formatCurrency(0) : formatCurrency(total)}</span>
                    </Stack>
                </ul>
            </ListGroup.Item>
        </ListGroup>
    );
}
