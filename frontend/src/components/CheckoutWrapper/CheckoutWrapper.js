import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
	removeNavContent,
	addNavContent,
	fullHeightContainer,
	removeFullHeightContainer
} from '../../utilities/helper';
import Row from 'react-bootstrap/Row';
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

	const el = document.querySelector('.full-height-wrapper').parentElement;
	const btns = document.querySelector('.desktop-btns');
	const nav = document.querySelector('.navbar-nav');

	useEffect(() => {
		removeNavContent(location.pathname, btns, nav);
		fullHeightContainer(location.pathname, el);

		return () => {
			addNavContent(btns, nav);
			removeFullHeightContainer(el);
		};
	}, []);

	const addOns = [];

	if (status === 'successful') {
		addNavContent(btns, nav);
		removeFullHeightContainer(el);
		document.getElementById('checkout-wrapper').classList.add('padding-bottom');
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
