import React, { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SeatingMap } from '../SeatingMap';
import { TicketPurchase } from '../TicketPurchase';

import './ticket.scss';

export default function PurchaseTickets() {
	return (
		<Fragment>
			<Row className="py-md-3 pb-3">
				<Col md={8} className="d-flex justify-content-center align-items-center">
					<SeatingMap />
				</Col>
				<Col md={4}>
					<TicketPurchase />
				</Col>
			</Row>
		</Fragment>
	);
}
