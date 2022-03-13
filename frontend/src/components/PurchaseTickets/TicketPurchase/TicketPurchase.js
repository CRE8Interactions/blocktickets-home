import React, { useState } from 'react';

import { SeatSelection } from './SeatSelection';
import { SeatConfirmation } from './SeatConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({ handleClick, status }) {
	return (
		<div className="left-col">
			{status === 'selection' && <SeatSelection handleClick={handleClick} />}

			{status === 'confirmation' && <SeatConfirmation />}

			{status === 'presale' && <TicketPresale handleClick={handleClick} />}
		</div>
	);
}
