import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

import './orderSummary.scss';

export default function OrderSummary({order}) {
	let sum;
	let fees;

	if (order.details.listing) {
		sum = (order.details.listing.askingPrice).toFixed(2)
		// sum = sum.reduce((a,v) => a + v ,0).toFixed(2)
	} else if (order.details) {
		sum = (order.details.ticket.resale ? order.details.ticket.listingAskingPrice : order.details.ticket.cost).toFixed(2)
	}

	fees = order.tickets.map(ticket => ticket.fee + ticket.facilityFee)
	fees = fees.reduce((a,v) => a + v ,0).toFixed(2)

	return (
		<ListGroup as="ul" variant="flush" id="order">
			<ListGroup.Item as="li" className="list">
				<Stack direction="horizontal"  className="split-row">
						<span>Payment</span>
						<span />
					</Stack>
			</ListGroup.Item>
			<ListGroup.Item as="li" className="list">
				<ul>
					<Stack direction="horizontal" as="li"  className="split-row">
								<span>Subtotal</span>
								<span className='text-end'>${sum}</span>
							</Stack>
					<Stack direction="horizontal" as="li"  className="split-row">
								<span>Fees</span>
								<span className='text-end'>${fees}</span>
						</Stack>
					<Stack direction="horizontal" as="li"  className="split-row">
								<span>Tax</span>
								<span className='text-end'>${(4.35 + 2.50).toFixed(2)}</span>
							</Stack>
					<Stack direction="horizontal" as="li"  className="split-row">
								<span>Total</span>
								<span className='text-end'>${order?.total}</span>
							</Stack>
				</ul>
			</ListGroup.Item>
		</ListGroup>
	);
}
