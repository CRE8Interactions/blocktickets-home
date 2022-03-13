import React, { Fragment, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets() {
	const [
		status,
		setStatus
	] = useState('selection');

	const handleClick = (type) => {
		setStatus(type);
		console.log(status);
	};

	return (
		<Fragment>
			<Row className="py-md-3 pb-3">
				<Col md={7} className="d-flex justify-content-center align-items-center">
					<SeatingMap
						styles={
							(status === 'confirmation' || status === 'presale') &&
							'tablet-desktop-only'
						}
					/>
				</Col>
				<Col md={5}>
					<TicketPurchase handleClick={handleClick} status={status} />
				</Col>
			</Row>
		</Fragment>
	);
}
