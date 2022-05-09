import React, { useLayoutEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { BackButton } from '../BackButton';
import { MyTicketsSlider } from './../Slider/MyTicketsSlider';
import { TicketModal } from './../TicketCard/TicketModal';

import './myTicketsWrapper.scss';

export default function MyTicketsWrapper({ id }) {
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
		<section className="spacer-xs full-height-wrapper" id="my-tickets-wrapper">
			<div className="section-heading-sm">
				<h1>Event details</h1>
				<BackButton />
			</div>

			<MyTicketsSlider id={id} />
			<Stack
				direction="horizontal"
				gap={3}
				className="btn-group-flex justify-content-center align-items-center">
				<Button
					onClick={() => handleClick('transfer')}
					variant="dark"
					size="lg"
					disabled={ticketStatus === 'transferred'}>
					Transfer
				</Button>
				<Button
					disabled={ticketStatus === 'listed'}
					onClick={() => handleClick('sell')}
					variant="dark"
					size="lg">
					Sell
				</Button>
			</Stack>

			<TicketModal
				ticketStatus={ticketStatus}
				setTicketStatus={setTicketStatus}
				show={show}
				setShow={setShow}
			/>
		</section>
	);
}
