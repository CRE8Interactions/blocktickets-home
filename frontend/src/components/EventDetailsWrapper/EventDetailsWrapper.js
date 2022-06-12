import React, { useLayoutEffect, useEffect, useState } from 'react';

import { getOrder } from '../../utilities/api';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { Event } from '../Event';
import { MyTickets } from './MyTickets';
import { MyTicketsSlider } from './MyTicketsSlider';
import { ActionBtns } from './ActionBtns';
import { TicketModal } from '../TicketModal';
import { useNavigate } from 'react-router-dom';

export default function EventDetailsWrapper({ orderId }) {

	const [order, setOrder] = useState()

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

	let navigate = useNavigate();

	const getMyOrders = () => {
		getOrder(orderId).then((res) =>{ 
			if (res.data.tickets.length === 0) {
				navigate('/my-listings', { replace: true })
				return
			}
			setOrder(res.data)
		}).catch((err) => console.error(err));
	}

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

		useEffect(
		() => {
			getMyOrders()
		},
		[
			orderId
		]
	);

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
				<MyTicketsSlider order={order} />
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
				getMyOrders={getMyOrders}
			/>
		</section>
	);
}
