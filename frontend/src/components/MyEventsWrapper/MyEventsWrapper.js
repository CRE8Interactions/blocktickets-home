import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { getMyEvents, getIncomingTransfers, acceptIncomingTransfers } from '../../utilities/api';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyEventsSlider } from './MyEventsSlider';

export default function MyEventsWrapper() {
	const [
		orders,
		setOrders
	] = useState([]);

	const [
		transfers,
		setTransfers
	] = useState([]);

	const getMyTickets = () => {
		getMyEvents()
			.then((res) => {
				setOrders(res.data);
			})
			.catch((err) => console.error(err));

		getIncomingTransfers().then((res) => setTransfers(res.data)).catch((err) => console.log(err));
	};

	useEffect(() => {
		getMyTickets();
	}, []);

	const acceptTransfer = (transfer) => {
		let data = {
			transferId: transfer.id
		};
		acceptIncomingTransfers(data).then((res) => getMyTickets()).catch((err) => console.error(err));
	};

	return (
		<section className="spacer-xs">
			<div className="section-heading-sm">
				<h1>My Events</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<MyEventsSlider orders={orders} transfers={transfers} acceptTransfer={acceptTransfer} />
		</section>
	);
}
