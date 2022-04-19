import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';

import { OrderSummary } from './OrderSummary';
import { AddOns } from './AddOns';
import { Tickets } from './Tickets';

import './paymentConfirmation.scss';

export default function PaymentConfirmation({ addOns }) {
	return (
		<Fragment>
			<Col md={7} lg={6}>
				<h1 className="fs-md page-heading">Payment Successful</h1>

				<section id="tickets" className="d-flex-column position-relative">
					<Tickets />
				</section>

				{addOns.length > 0 && (
					<section id="addOns">
						<AddOns />
					</section>
				)}
			</Col>
			<Col md={5} id="order-card">
				<OrderSummary />
			</Col>
		</Fragment>
	);
}
