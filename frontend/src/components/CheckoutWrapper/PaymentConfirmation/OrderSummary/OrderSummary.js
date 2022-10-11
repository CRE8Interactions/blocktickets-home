import React, { useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

import './orderSummary.scss';

export default function OrderSummary({ order }) {
    let sum;
    let fees;
    let tax;
    let total;

    if (order.details.listing) {
        sum = (order.details.listing.askingPrice).toFixed(2);
        fees = (parseFloat(order.details.feeDetails.serviceFees).toFixed(2) + parseFloat(order.details.feeDetails.paymentProcessingFee)).toFixed(2);
        tax = parseFloat(order.details.feeDetails.tax).toFixed(2);
        total = parseFloat(fees) + parseFloat(tax) + parseFloat(sum);
    } else if (order.details) {
        sum = order.tickets.map(ticket => ticket.cost).reduce((a, v) => a + v, 0).toFixed(2)
        let facilityFee = order.details.feeDetails.facilityFee;
        let paymentProcessingFee = order.details.feeDetails.paymentProcessingFee;
        let serviceFees = order.details.feeDetails.serviceFees;
        fees = parseFloat(facilityFee) + parseFloat(paymentProcessingFee) + parseFloat(serviceFees)
        fees = fees * order.details.ticketCount;
        tax = parseFloat(order.details.feeDetails.tax).toFixed(2) * order.details.ticketCount;
        total = fees + tax + parseFloat(sum);
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
                        <span className='text-end'>${sum}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Fees</span>
                        <span className='text-end'>${sum == 0 ? parseFloat(0).toFixed(2) : fees}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Tax</span>
                        <span className='text-end'>${sum == 0 ? parseFloat(0).toFixed(2) : tax}</span>
                    </Stack>
                    <Stack direction="horizontal" as="li" className="split-row">
                        <span>Total</span>
                        <span className='text-end'>${sum == 0 ? parseFloat(0).toFixed(2) : parseFloat(total).toFixed(2)}</span>
                    </Stack>
                </ul>
            </ListGroup.Item>
        </ListGroup>
    );
}
