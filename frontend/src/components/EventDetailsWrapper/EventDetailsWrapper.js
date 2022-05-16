import React, { useLayoutEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { Event } from '../Event';
import { MyTickets } from './MyTickets';
import { MyTicketsSlider } from '../Slider/MyTicketsSlider';
import { ActionBtns } from './ActionBtns';
import { TicketModal } from '../TicketCard/TicketModal';

export default function EventDetailsWrapper({ order }) {

	const [
		show,
		setShow
	] = useState(false);

	const [
		ticketAction,
		setTicketAction
	] = useState('');

	const [
		ticketStatus,
		setTicketStatus
	] = useState('');

	useLayoutEffect(() => {
		const el = document.querySelector('#main-container');
		const body = document.body;

		fullHeightContainer(el);
		body.classList.add('noBodyPadding');

		return () => {
			removeFullHeightContainer(el);
			body.classList.remove('noBodyPadding');
		};
	}, []);

	const handleShow = () => setShow(true);

	const handleClick = (action) => {
		handleShow();
		setTicketAction(action);
	};
	return (
		<section className="spacer-xs full-height-wrapper">
			<div className="section-heading-sm">
				<h1>Event details</h1>
				<BackButton />
			</div>
			<div className="tablet-desktop-only">
				<Event event={order?.event} />
			</div>
			<div className="mobile-only">
				<MyTicketsSlider id={'id'} />
				<ActionBtns handleClick={handleClick} ticketStatus={ticketStatus} />
			</div>
			<div className="tablet-desktop-only">
				<MyTickets order={order} handleClick={handleClick} ticketStatus={ticketStatus} />
			</div>
			<TicketModal
				ticketAction={ticketAction}
				setTicketStatus={setTicketStatus}
				show={show}
				setShow={setShow}
				order={order}
			/>
		</section>
	);
}
