import React, { useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { ticketPrices } from '../../../../../utilities/helpers';

export default function Ticket({ ticket, handleNext, ticketFilters, listing }) {
	let ticketPrice;
	let ticketPriceWithFees;
	let ticketName;
	let ticketType;
	let ticketFee;

	useEffect(() => {
		// Some actions
	}, [ticket])

	const ticketTypes = (ticket) => {
		if (!ticket?.resale && ticket?.on_sale_status === 'available') return 'Standard Ticket';
		if (!ticket?.resale && ticket?.on_sale_status === 'presale') return 'Presale';
		if (ticket?.resale && ticket?.on_sale_status === 'resaleAvailable') return 'Resale Ticket';
	};
	
	if (ticket) {
		let prices = ticketPrices(ticket, listing);
		ticketPrice = `${prices.ticketCost} ea`;
		ticketName = prices.ticketName;
		ticketType = prices.ticketType;
		ticketFee = prices.totalFees;
		ticketPriceWithFees = prices.ticketCostWithFees;
	}

	if (listing) {
		// let prices = ticketPrices(ticket, listing);
		// ticketPrice = `${prices.ticketCost} ea`;
		// ticketName = prices.ticketName;
		// ticketType = `Resale ${listing.tickets.length} Tickets`;
		// ticketFee = prices.totalFees;
		// ticketPriceWithFees = prices.ticketCostWithFees;
	}

	return (
		<ListGroup.Item
			onClick={() => handleNext(ticket ? ticket : null, listing ? listing : null)}
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
							`$${ticketPriceWithFees} ea`
						) : (
							`$${ticketPrice}`
						)}
					</span>
				</div>
				<div>
					{ticketFilters.showFees && (
						<span className="text-muted caption">
							${parseFloat(ticketPrice).toFixed(2)} + ${parseFloat(
								ticketFee
							).toFixed(2)} Fees
						</span>
					)}
				</div>
			</div>
		</ListGroup.Item>
	);
}
