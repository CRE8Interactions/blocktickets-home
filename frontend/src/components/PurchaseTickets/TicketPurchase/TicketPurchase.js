import React from 'react';

import { TicketSelection } from './TicketSelection';
import { TicketConfirmation } from './TicketConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({
	handleClick,
	handleGoBack,
	step,
	type,
	isZoomed,
	ticket
}) {
	return (
		<div className="left-col">
			{step === 'selection' && (
				<TicketSelection handleClick={handleClick} type={type} isZoomed={isZoomed} />
			)}

			{step === 'confirmation' && (
				<TicketConfirmation handleGoBack={handleGoBack} type={type} ticket={ticket} />
			)}

			{step === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
