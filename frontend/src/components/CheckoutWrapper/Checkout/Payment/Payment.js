import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { PaymentElement } from '@stripe/react-stripe-js';
import { cartTotal } from '../../../../utilities/helper';

import './payment.scss';

export default function Payment() {	
	const CheckoutForm = () => {
		return (
			<Form id="checkout-form">
				<Form.Group className="form-group" controlId="card-holder">
					<Form.Label>Name on Card</Form.Label>
					<Form.Control type="text" name="card-holder" id="" />
				</Form.Group>
				<PaymentElement />
			</Form>
		);
	};

	return (
		<Fragment>
			<h1 className="section-title mb-3">Payment</h1>
			<h2 className="text-muted small fw-medium">Please select a payment method</h2>
				<CheckoutForm />
		</Fragment>
	);
}
