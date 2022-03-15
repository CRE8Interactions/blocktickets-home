import React, { Fragment, useState } from 'react';

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
		<div className="pt-md-3 flex d-flex flex-column flex-md-row">
			<SeatingMap
				styles={(status === 'confirmation' || status === 'presale') && 'desktop-only--flex'}
			/>

			<TicketPurchase handleClick={handleClick} status={status} />
		</div>
	);
}
