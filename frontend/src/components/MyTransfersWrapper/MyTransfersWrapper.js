import React, { useLayoutEffect, useEffect, useState } from 'react';

import { getMyTransfers } from '../../utilities/api';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyTransfersSlider } from './MyTransfersSlider';
import { TicketModal } from '../TicketModal';

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

	const [
		transfers,
		setTransfers
	] = useState([]);

	const [
		transfer,
		setTransfer
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

	useEffect(() => {
		getTransfers();
	}, []);

	const getTransfers = () => {
		getMyTransfers().then((res) => setTransfers(res.data)).catch((err) => console.error(err));
	};

	const handleShow = () => setShow(true);

	const handleClick = (action, transfer) => {
		setTransfer(transfer);
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
				<Tabs defaultActiveKey="pending" variant="pills" activeKey={key} onSelect={(k) => setKey(k)}>
					<Tab eventKey="pending" title="Pending">
						<MyTransfersSlider
							transfers={transfers.filter((transfer) => transfer.status === 'pending')}
							cancel={handleClick}
						/>
					</Tab>
					<Tab eventKey="completed" title="Completed">
						<MyTransfersSlider
							transfers={transfers.filter(
								(transfer) => transfer.status === 'claimed' || transfer.status === 'cancelled'
							)}
						/>
					</Tab>
				</Tabs>
			</div>

			<TicketModal
				ticketAction={ticketAction}
				show={show}
				setShow={setShow}
				transfer={transfer}
				getMyTransfers={getTransfers}
			/>
		</section>
	);
}
