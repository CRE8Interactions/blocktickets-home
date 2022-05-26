import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

export default function Ticket({ ticket, handleNext }) {
	const ticketPrice = ticket.attributes.resale ? ticket.attributes.listingAskingPrice : ticket.attributes.cost;
	const ticketTypes = (ticket) => {
		if (!ticket.resale && ticket.on_sale_status === 'available') return 'Ticket';
		if (!ticket.resale && ticket.on_sale_status === 'presale') return 'Presale';
		if (ticket.resale && ticket.on_sale_status === 'resaleAvailable') return 'Resale Ticket';
	};

	return (
		<ListGroup.Item
			onClick={() => handleNext(ticket.attributes)}
			action
			as="li"
			className="d-flex justify-content-between align-items-center">
			<div>
				<div>
					<span className="fw-bold p-0">{ticket.attributes.name}</span>
				</div>
				<div>
					<span className="text-muted caption">{ticketTypes(ticket.attributes)}</span>
				</div>
			</div>
			<div className="text-end">
				<div>
					<span className="fw-bold text-end">
						${parseFloat(
							ticketPrice + ticket.attributes.fee + ticket.attributes.facilityFee + 2.5 + 4.35
						).toFixed(2)}
					</span>
				</div>
				<div>
					<span className="text-muted caption">${parseFloat(ticketPrice).toFixed(2)} + Fees</span>
				</div>
			</div>
		</ListGroup.Item>
	);
}
