import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

import {
	removeNavContent,
	addNavContent,
	fullHeightContainer,
	removeFullHeightContainer
} from '../../utilities/helper';
import { Checkout } from './Checkout';
import { PaymentConfirmation } from './PaymentConfirmation';
import { Timer } from './Timer';

import './checkoutWrapper.scss';

export default function CheckoutWrapper() {
	let location = useLocation();

	const [
		status,
		setStatus
	] = useState('checkout');

	useLayoutEffect(() => {
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');

		removeNavContent(location.pathname, btns, nav);

		return () => {
			addNavContent(btns, nav);
		};
	}, []);

	useEffect(() => {
		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(location.pathname, el);

		return () => {
			removeFullHeightContainer(el);
		};
	});

	const addOns = [];

	if (status === 'successful') {
		const el = document.querySelector('.full-height-wrapper').parentElement;
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');

		addNavContent(btns, nav);
		removeFullHeightContainer(el);
		document.getElementById('checkout-wrapper').classList.add('confirmation-padding');
	}

	return (
		<div className="full-height-wrapper" id="checkout-wrapper">
			<Row className="justify-content-between">
				{status === 'checkout' && <Checkout addOns={addOns} setStatus={setStatus} />}
				{status === 'successful' && <PaymentConfirmation addOns={addOns} />}
			</Row>

			{status === 'checkout' && <Timer />}
		</div>
	);
}
