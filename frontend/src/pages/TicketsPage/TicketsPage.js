import React, { useEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { Event } from '../../components';
import { PurchaseTickets } from '../../components';
import { useParams } from 'react-router-dom';
import { getEvent, getEventTickets } from '../../utilities/api';
import TicketContext from '../../context/Ticket/Ticket';

import './ticketPage.scss';

export default function TicketsPage() {
	let { id } = useParams();
	const [
		event,
		setEvent
	] = useState();
	const [
		tickets,
		setTickets
	] = useState();
	const [
		generalAdmissionCount,
		setGaCount
	] = useState();
	const [
		generalAdmissionTicket,
		setGaTicket
	] = useState();

	useEffect(() => {
		const el = document.querySelector('.full-height-wrapper').parentElement;

		fullHeightContainer(el);

		return () => {
			removeFullHeightContainer(el);
		};
	}, []);

	useEffect(
		() => {
			getEventTickets(id)
				.then((res) => {
					setTickets(res.data.data);
					let generalAdminssionCount = res.data.data.map(
						(ticket) =>
							ticket.attributes.generalAdmission === true &&
							ticket.attributes.on_sale_status === 'available'
					).length;
					let generalAdmissionTicket = res.data.data.find(
						(ticket, index) =>
							ticket.attributes.generalAdmission === true &&
							ticket.attributes.on_sale_status === 'available'
					);
					setGaCount(generalAdminssionCount);
					setGaTicket(generalAdmissionTicket);
				})
				.catch((err) => console.error(err));

			getEvent(id).then((res) => setEvent(res.data)).catch((err) => console.error(err));
		},
		[
			id
		]
	);

	return (
		<div className="full-height-wrapper">
			<TicketContext.Provider
				value={{ tickets, generalAdmissionCount, generalAdmissionTicket }}>
				<Event event={event} />
				<PurchaseTickets />
			</TicketContext.Provider>
		</div>
	);
}
