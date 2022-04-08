import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { getPaymentIntent } from './../../../../utilities/api';

import './payment.scss';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Payment() {
	const [
		clientSecret,
		setClientSecret
	] = useState('');

	useEffect(() => {
		getPaymentIntent()
			.then((res) => setClientSecret(res.data.client_secret))
			.catch((err) => console.error(err));
	}, []);

	const appearance = {
		theme: 'flat',
		variables: {
			fontFamily: ' "Poppins", sans-serif',
			fontLineHeight: '1.4',
			fontSizeBase: '14px',
			fontSizeSm: '12px',
			fontWeightNormal: '500',
			borderRadius: '12px',
			colorPrimary: '#5ab6f8',
			colorBackground: '#fcfcfd',
			colorText: '#23262F',
			colorWarning: '#EF466F',
			colorDanger: '#EF466F',
			colorTextSecondary: '#B1B5C3',
			spacingUnit: '12px',
			spacingGridRow: '24px'
		},
		rules: {
			'.Input': {
				boxShadow: '0px 0px 0px 2px #E6E8EC',
				padding: '12.250px 14.875px',
				lineHeight: 'var(--fontLineHeight)'
			},

			'.Input:focus': {
				outline: '0',
				boxShadow: '0px 0px 0px 2px var(--colorPrimary)'
			},
			'.Input:disabled, .Input--invalid:disabled': {
				color: 'lightgray'
			},
			'.Tab': {
				boxShadow: '0px 0px 0px 2px #E6E8EC',
				padding: '12.250px 14.875px',
				border: 'none'
			},
			'.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
				border: 'none',
				boxShadow: '0px 0px 0px 2px var(--colorPrimary)',
				backgroundColor: 'var(--colorPrimary)',
				opacity: '5%'
			},
			'.Label': {
				fontWeight: '700',
				textTransform: 'uppercase',
				color: 'var(--colorTextSecondary)',
				marginBottom: 'var(--spacingUnit)',
				lineHeight: 'var(--fontLineHeight)'
			},

			'.Input--invalid': {
				boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)'
			},

			'.Error': {
				marginTop: 'var(--spacingUnit)'
			}
		}
	};

	const options = {
		// passing the client secret obtained from the server
		clientSecret,
		appearance
	};

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
			{clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm />
				</Elements>
			)}
		</Fragment>
	);
}
