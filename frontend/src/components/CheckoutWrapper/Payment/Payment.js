import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import info from '../../../assets/icons/info.svg';
import './payment.scss';

export default function Payment() {
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

	return (
		<Fragment>
			<h1 className="fs-md ">Payment</h1>
			<small className="text-muted fw-medium">Please select a payment method</small>
			<p>Payment element goes here from Stripe</p>
		</Fragment>
	);
}
