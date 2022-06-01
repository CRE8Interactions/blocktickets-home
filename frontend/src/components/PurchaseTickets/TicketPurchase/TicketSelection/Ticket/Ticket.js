import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

export default function Ticket({ ticket, handleNext, ticketFilters, listing }) {
	let ticketPrice;
	let ticketName;
	let ticketType;

	const ticketTypes = (ticket) => {
		if (!ticket?.resale && ticket?.on_sale_status === 'available') return 'Standard Ticket';
		if (!ticket?.resale && ticket?.on_sale_status === 'presale') return 'Presale';
		if (ticket?.resale && ticket?.on_sale_status === 'resaleAvailable') return 'Resale Ticket';
	};
	
	if (ticket) {
		ticketPrice = `${parseFloat(ticket?.attributes.resale ? ticket?.attributes.listingAskingPrice : ticket?.attributes.cost).toFixed(2)} ea`;
		ticketName = ticket?.attributes.name;
		ticketType = ticketTypes(ticket?.attributes);
	}

	if (listing) {
		ticketPrice = `${parseFloat(listing.askingPrice).toFixed(2)} ea`;
		ticketName = listing.tickets.length > 0 ? listing.tickets[0]?.name : '';
		ticketType = `Resale ${listing.tickets.length} Tickets`;
	}

	return (
		<ListGroup.Item
			onClick={() => handleNext(ticket ? ticket.attributes : null, listing ? listing : null)}
			action
			as="li"
			className="d-flex justify-content-between align-items-center">
			<div>
				<div>
					<span className="fw-bold p-0">{ticketName}</span>
				</div>
				<div>
					<span className="text-muted caption">{ticketType}</span>
				</div>
			</div>
			<div className="text-end">
				<div>
					<span className="fw-bold text-end">
						{ticketFilters.showFees ? (
							`$${parseFloat(
								ticketPrice + ticket?.attributes.fee + ticket?.attributes.facilityFee + 2.5 + 4.35
							).toFixed(2)}`
						) : (
							`$${ticketPrice}`
						)}
					</span>
				</div>
				<div>
					{ticketFilters.showFees && (
						<span className="text-muted caption">
							${parseFloat(ticketPrice).toFixed(2)} + ${parseFloat(
								ticket?.attributes.fee + ticket?.attributes.facilityFee + 2.5 + 4.35
							).toFixed(2)}
						</span>
					)}
				</div>
			</div>
		</ListGroup.Item>
	);
}
