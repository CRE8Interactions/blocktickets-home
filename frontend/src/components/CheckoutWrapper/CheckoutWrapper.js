import React, { useEffect } from 'react';
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

import './checkoutWrapper.scss';

export default function CheckoutWrapper() {
	let location = useLocation();

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

	return (
		<div className="full-height-wrapper" id="checkout-wrapper">
			<BackButton />
			<Row className="justify-content-between">
				<Col md={5}>
					<div className="scroll-container">
						<div className="scrollable-content">
							<div className="content">
								<section id="addOns">
									<AddOns />
								</section>
								<section id="">
									<Payment />
								</section>
							</div>
						</div>
					</div>
				</Col>
				<Col md={5}>
					<TotalCard />
				</Col>
			</Row>
		</div>
	);
}
