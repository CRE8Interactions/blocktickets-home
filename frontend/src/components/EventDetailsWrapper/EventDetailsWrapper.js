import React, { useLayoutEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { Event } from '../Event';
import { MyTickets } from './MyTickets';
import { MyTicketsSlider } from '../Slider/MyTicketsSlider';
import { ActionBtns } from './ActionBtns';
import { TicketModal } from '../TicketCard/TicketModal';

export default function EventDetailsWrapper({ id }) {
	const [
		show,
		setShow
	] = useState(false);

	const [
		ticketStatus,
		setTicketStatus
	] = useState('');

	useLayoutEffect(() => {
		const el = document.querySelector('#main-container');

		fullHeightContainer(el);

		return () => {
			removeFullHeightContainer(el);
		};
	}, []);

	const handleShow = () => setShow(true);

	const handleClick = (status) => {
		console.log('click');
		handleShow();
		setTicketStatus(status);
	};
	return (
		<section className="spacer-xs full-height-wrapper" id="event-details-wrapper">
			<div className="section-heading-sm">
				<h1>Event details</h1>
				<BackButton />
			</div>
			<div className="tablet-desktop-only">
				<Event />
			</div>
			<div className="mobile-only">
				<MyTicketsSlider id={id} />
				<ActionBtns handleClick={handleClick} ticketStatus={ticketStatus} />
			</div>
			<div className="tablet-desktop-only">
				<MyTickets id={id} handleClick={handleClick} ticketStatus={ticketStatus} />
			</div>
			<TicketModal
				ticketStatus={ticketStatus}
				setTicketStatus={setTicketStatus}
				show={show}
				setShow={setShow}
			/>
		</section>
	);
}
