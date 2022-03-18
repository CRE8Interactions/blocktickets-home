import React from 'react';

import { SeatSelection } from './SeatSelection';
import { SeatConfirmation } from './SeatConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({
	handleClick,
	handleGoBack,
	step,
	setTypeOfTicket,
	typeOfTicket
}) {
	return (
		<div className="left-col">
			{step === 'selection' && (
				<SeatSelection handleClick={handleClick} setType={setTypeOfTicket} />
			)}

			{step === 'quantity' && (
				<SeatConfirmation handleGoBack={handleGoBack} type={typeOfTicket} />
			)}

			{step === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
