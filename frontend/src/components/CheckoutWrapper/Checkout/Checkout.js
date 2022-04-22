import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';

import { AddOns } from './AddOns';
import { Payment } from './Payment';
import { TotalCard } from './TotalCard';
import { BackButton } from '../../BackButton';

import './checkout.scss';

export default function Checkout({ addOns, setStatus, setOrder, intentId }) {

	return (
		<Fragment>
			<Col md={6}>
				<BackButton marginBottom="4" />
				{addOns.length > 0 && (
					<section id="addOns">
						<AddOns />
					</section>
				)}
				<section>
					<Payment />
				</section>
			</Col>
			<Col md={6} lg={5} id="total-card">
				<TotalCard setStatus={setStatus} addOns={addOns} setOrder={setOrder} intentId={intentId} />
			</Col>
		</Fragment>
	);
}
