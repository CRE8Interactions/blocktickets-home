import React, { Fragment, useEffect } from 'react';

import { PurchaseTickets } from '../../components';
import { useLocation } from 'react-router-dom';
import { fullHeightContainer, removeFullHeightContainer } from './../../utilities/helper';
import { Event } from '../../components';

import './ticketPage.scss';

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
			<Event />
			<PurchaseTickets />
		</div>
	);
}
