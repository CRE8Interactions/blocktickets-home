import React, { useLayoutEffect, useEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyTransfersSlider } from '../Slider/MyTransfersSlider';
import { TicketModal } from '../TicketCard/TicketModal';

import './myTransfersWrapper.scss';

export default function MyTransfersWrapper() {
	const [
		key,
		setKey
	] = useState('pending');

	const [
		show,
		setShow
	] = useState(false);

	const [
		ticketAction,
		setTicketAction
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
		<section className="spacer-xs" id="my-transfers-wrapper">
			<div className="section-heading-sm">
				<h1>My Transfers</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<div className="d-flex-column position-relative">
				<Tabs
					defaultActiveKey="pending"
					variant="pills"
					activeKey={key}
					onSelect={(k) => setKey(k)}>
					<Tab eventKey="pending" title="Pending">
						<MyTransfersSlider />
					</Tab>
					<Tab eventKey="completed" title="Completed">
						<MyTransfersSlider />
					</Tab>
				</Tabs>
				{key === 'pending' && (
					<Stack
						direction="horizontal"
						className="btn-group-flex justify-content-center action-btns"
						id="cancel-btn">
						<Button
							variant="outline-light"
							onClick={() => handleClick('cancel')}
							className="text-danger"
							size="lg">
							Cancel transfer
						</Button>
					</Stack>
				)}
			</div>

			<TicketModal ticketAction={ticketAction} show={show} setShow={setShow} />
		</section>
	);
}
