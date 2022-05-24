import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getEvent, getEventTickets, getResaleTickets } from '../../utilities/api';
import TicketContext from '../../context/Ticket/Ticket';

import { Event, PurchaseTickets } from '../../components';

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
	const [
		reSaleTickets,
		setResaleTickets
	] = useState();

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

			getResaleTickets(id).then((res) => setResaleTickets(res.data.data)).catch((err) => console.error(err));
		},
		[
			id
		]
	);

	return (
		<div className="full-height-wrapper">
			<TicketContext.Provider value={{ tickets, generalAdmissionCount, generalAdmissionTicket, reSaleTickets }}>
				<div className="pt-md-3">
					<Event event={event} />
				</div>
				<PurchaseTickets />
			</TicketContext.Provider>
		</div>
	);
}
