import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { PaymentElement } from '@stripe/react-stripe-js';

import './payment.scss';

export default function Payment({checkValid}) {	
	let name;
	const CheckoutForm = () => {
		return (
			<Form id="checkout-form">
				<Form.Group className="form-group" controlId="card-holder">
					<Form.Label>Name on Card</Form.Label>
					<Form.Control type="text" name="card-holder" onChange={ (e) => name = e.target.value } autoComplete={'off'} />
				</Form.Group>
				<PaymentElement onChange={(e) => checkValid(e, name)} />
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
