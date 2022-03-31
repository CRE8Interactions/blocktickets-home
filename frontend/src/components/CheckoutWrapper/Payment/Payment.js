import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { getPaymentIntent } from '../../../utilities/api';

import info from '../../../assets/icons/info.svg';

import './payment.scss';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Payment() {
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		getPaymentIntent()
			.then(res => setClientSecret(res.data.client_secret))
			.catch(err => console.error(err))
	}, [])
	
	// const appearance = {
	// 	theme: 'flat',
	// 	variables: {
	// 		fontFamily: ' "Gill Sans", sans-serif',
	// 		fontLineHeight: '1.5',
	// 		borderRadius: '10px',
	// 		colorBackground: '#F6F8FA',
	// 		colorPrimaryText: '#262626'
	// 	},
	// 	rules: {
	// 		'.Block': {
	// 			backgroundColor: 'var(--colorBackground)',
	// 			boxShadow: 'none',
	// 			padding: '12px'
	// 		},
	// 		'.Input': {
	// 			padding: '12px'
	// 		},
	// 		'.Input:disabled, .Input--invalid:disabled': {
	// 			color: 'lightgray'
	// 		},
	// 		'.Tab': {
	// 			padding: '10px 12px 8px 12px',
	// 			border: 'none'
	// 		},
	// 		'.Tab:hover': {
	// 			border: 'none',
	// 			boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
	// 		},
	// 		'.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
	// 			border: 'none',
	// 			backgroundColor: '#fff',
	// 			boxShadow:
	// 				'0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
	// 		},
	// 		'.Label': {
	// 			fontWeight: '500'
	// 		}
	// 	}
	// };

	// // Pass the appearance object to the Elements instance
	// const elements = stripe.elements({ clientSecret, appearance });

	const options = {
    // passing the client secret obtained from the server
    clientSecret
  };

	const CheckoutForm = () => {
		return (
			<form>
				<PaymentElement />
			</form>
		);
	};

	return (
		<Fragment>
			<h1 className="fs-md ">Payment</h1>
			{ clientSecret &&
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm />
				</Elements>
			}
		</Fragment>
	);
}
