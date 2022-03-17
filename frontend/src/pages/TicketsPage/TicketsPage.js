import React, { Fragment, useEffect } from 'react';

import { PurchaseTickets } from '../../components';
import Ticket from '../../components/Ticket/Ticket';

import './ticketPage.scss';
import { fullHeightContainer, removeFullHeightContainer } from './../../utilities/helper';
import { useLocation } from 'react-router-dom';

export default function TicketsPage() {
	let location = useLocation();

	useEffect(() => {
		const el = document.querySelector('#wrapper').parentElement;

		fullHeightContainer(location.pathname, el);

		return () => {
			removeFullHeightContainer(el);
		};
	}, []);

	return (
		<div id="wrapper">
			<Ticket />
			<PurchaseTickets />
		</div>
	);
}
