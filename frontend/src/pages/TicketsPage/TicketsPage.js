import React, { useEffect } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from './../../utilities/helper';

import { Event } from '../../components';
import { PurchaseTickets } from '../../components';

import './ticketPage.scss';

export default function TicketsPage() {
	useEffect(() => {
		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(el);

		return () => {
			removeFullHeightContainer(el);
		};
	}, []);

	return (
		<div className="full-height-wrapper">
			<Event />
			<PurchaseTickets />
		</div>
	);
}
