import React from 'react';

import { SeatSelection } from './SeatSelection';
import { SeatConfirmation } from './SeatConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({ handleClick, handleGoBack, step }) {
	return (
		<div className="left-col">
			{step === 'selection' && <SeatSelection handleClick={handleClick} />}

			{step === 'quantity' && <SeatConfirmation handleGoBack={handleGoBack} />}

			{step === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
