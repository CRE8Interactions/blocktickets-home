import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { removeNavContent, addNavContent } from '../../utilities/helper';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { BackButton } from '../BackButton';

import './checkoutWrapper.scss';

export default function CheckoutWrapper() {
	let location = useLocation();

	useEffect(() => {
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');

		removeNavContent(location.pathname, btns, nav);

		return () => {
			addNavContent(btns, nav);
		};
	}, []);

	return (
		<div className="checkout-wrapper">
			<header>
				<BackButton />
			</header>

			<Row>
				<Col md={6}>
					<section id="addOns">
						<AddOns />
					</section>
					<section id="">
						<Payment />
					</section>
				</Col>
				<Col md={6} />
			</Row>
		</div>
	);
}
