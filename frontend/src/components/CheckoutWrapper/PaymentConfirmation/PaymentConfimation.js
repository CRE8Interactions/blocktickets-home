import React, { Fragment } from 'react';

import {
	removeNavContent,
	addNavContent,
	fullHeightContainer,
	removeFullHeightContainer
} from '../../../utilities/helper';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

import { OrderSummary } from './OrderSummary';
import { AddOns } from './AddOns';
import { Tickets } from './Tickets';

import './paymentConfirmation.scss';

export default function PaymentConfirmation({ addOns }) {
	return (
		<Fragment>
			<Col md={6}>
				<h1 className="fs-md m-0">Payment Successful</h1>
				<div className="d-flex-column">
					<div className="scrollable-container">
						<div className="scrollable-content">
							<div className="content">
								<section id="tickets">
									<Tickets />
								</section>

								{addOns.length > 0 && (
									<section id="addOns">
										<AddOns />
									</section>
								)}
							</div>
						</div>
					</div>
				</div>
			</Col>
			<Col md={6} lg={5} id="total-card">
				<OrderSummary />
			</Col>
		</Fragment>
	);
}
