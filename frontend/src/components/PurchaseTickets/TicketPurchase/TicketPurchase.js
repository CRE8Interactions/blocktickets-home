import React, { useState } from 'react';

import { TicketSelection } from './TicketSelection';
import { TicketConfirmation } from './TicketConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({
	handleClick,
	handleGoBack,
	setIsFilterOpen,
	isFilterOpen,
	step,
	type,
	isZoomed,
	ticket,
	listing
}) {
	// how many tickets user wants
	const [
		ticketCount,
		setTicketCount
	] = useState(2);

	return (
		<div className="left-col">
			{step === 'selection' && (
				<TicketSelection
					handleClick={handleClick}
					setIsFilterOpen={setIsFilterOpen}
					isFilterOpen={isFilterOpen}
					isZoomed={isZoomed}
					setTicketCount={setTicketCount}
					ticketCount={ticketCount}
				/>
			)}

			{step === 'confirmation' && (
				<TicketConfirmation
					handleGoBack={handleGoBack}
					type={type}
					ticket={ticket}
					listing={listing}
					setTicketCount={setTicketCount}
					ticketCount={ticketCount}
				/>
			)}

			{step === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
