import React, { Fragment, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SeatSelection } from './SeatSelection';

import './ticketPurchase.scss';
import { SeatConfirmation } from './SeatConfirmation';

export default function TicketPurchase() {
	const [
		status,
		setStatus
	] = useState('selection');

	const handleClick = (type) => {
		setStatus('confirmation');
	};
	return (
		<div className="left-col">
			{status === 'selection' && <SeatSelection handleClick={handleClick} />}

			{status === 'confirmation' && <SeatConfirmation />}
		</div>
	);
}
