import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
	removeNavContent,
	addNavContent,
	fullHeightContainer,
	removeFullHeightContainer
} from '../../utilities/helper';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../BackButton';
import { Timer } from './Timer';

import './checkoutWrapper.scss';
import { PaymentConfirmation } from './PaymentConfirmation';

export default function CheckoutWrapper() {
	let location = useLocation();

	const [
		status,
		setStatus
	] = useState('checkout');

	const btns = document.querySelector('.desktop-btns');
	const nav = document.querySelector('.navbar-nav');

	useEffect(() => {
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');
		removeNavContent(location.pathname, btns, nav);

		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(location.pathname, el);

		return () => {
			addNavContent(btns, nav);
			removeFullHeightContainer(el);
		};
	}, []);

	const addOns = [];

	if (status === 'successful') {
		addNavContent(btns, nav);
	}

	return (
		<div className="full-height-wrapper" id="checkout-wrapper">
			<Row className="justify-content-between">
				{status === 'checkout' && (
					<Fragment>
						<Col md={6}>
							<BackButton />
							<div className="d-flex-column">
								<div className="scrollable-container">
									<div className="scrollable-content">
										<div className="content">
											{addOns.length > 0 && (
												<section id="addOns">
													<AddOns />
												</section>
											)}

											<section>
												<Payment />
											</section>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col md={6} lg={5} id="total-card">
							<TotalCard setStatus={setStatus} />
						</Col>
					</Fragment>
				)}
				{status === 'successful' && <PaymentConfirmation addOns={addOns} />}
			</Row>

			{status === 'checkout' && <Timer />}
		</div>
	);
}
