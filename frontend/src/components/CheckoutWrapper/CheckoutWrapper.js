import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

import {
	toggleNavContent,
	addNavContent,
	fullHeightContainer,
	removeFullHeightContainer,
	toggleTimer
} from '../../utilities/helper';
import { Checkout } from './Checkout';
import { PaymentConfirmation } from './PaymentConfirmation';

import './checkoutWrapper.scss';

export default function CheckoutWrapper() {
	let show = true;

	const [
		status,
		setStatus
	] = useState('checkout');

	useLayoutEffect(() => {
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');
		const timer = document.getElementById('timer-container');

		toggleTimer(timer, show);
		toggleNavContent(!show, btns, nav);

		return () => {
			toggleTimer(timer, !show);
			toggleNavContent(show, btns, nav);
		};
	}, []);

	useEffect(() => {
		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(el);

		return () => {
			removeFullHeightContainer(el);
		};
	});

	const addOns = [];

	if (status === 'successful') {
		const timer = document.getElementById('timer-container');

		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');

		toggleNavContent(show, btns, nav);
		toggleTimer(timer, !show);
		document.getElementById('checkout-wrapper').classList.add('confirmation-padding');
	}

	return (
		<div className="full-height-wrapper" id="checkout-wrapper">
			<Row className="justify-content-between">
				{status === 'checkout' && <Checkout addOns={addOns} setStatus={setStatus} />}
				{status === 'successful' && <PaymentConfirmation addOns={addOns} />}
			</Row>
		</div>
	);
}
