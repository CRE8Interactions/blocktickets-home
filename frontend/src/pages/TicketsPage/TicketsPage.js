import React, { useEffect, useState, createContext } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from './../../utilities/helper';

import { Event } from '../../components';
import { PurchaseTickets } from '../../components';
import {
  useParams
} from "react-router-dom";
import { getEvent, getEventTickets } from '../../utilities/api';
import TicketContext from '../../context/Ticket/Ticket';

import './ticketPage.scss';

export default function TicketsPage() {
	let { id } = useParams();
	const [event, setEvent] = useState()
	const [tickets, setTickets] = useState()

	
	useEffect(() => {
		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(el);

		return () => {
			removeFullHeightContainer(el);
		};
	}, []);

	useEffect(() => {
		getEventTickets(id)
			.then((res) => setTickets(res.data.data) )
			.catch((err) => console.error(err))
		
		getEvent(id)
			.then((res) => setEvent(res.data))
			.catch((err) => console.error(err))
	}, [id])

	return (
		<div className="full-height-wrapper">
			<TicketContext.Provider value={tickets}>
				<Event event={event} />
				<PurchaseTickets />
			</TicketContext.Provider>
		</div>
	);
}
