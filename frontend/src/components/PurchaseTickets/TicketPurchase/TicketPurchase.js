import React from 'react';

import { SeatSelection } from './SeatSelection';
import { SeatConfirmation } from './SeatConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({ handleClick, handleGoBack, step, type, isZoomed }) {
	return (
		<div className="left-col">
			{step === 'selection' && (
				<SeatSelection handleClick={handleClick} type={type} isZoomed={isZoomed} />
			)}

			{step === 'confirmation' && (
				<SeatConfirmation handleGoBack={handleGoBack} type={type} />
			)}

			{step === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
