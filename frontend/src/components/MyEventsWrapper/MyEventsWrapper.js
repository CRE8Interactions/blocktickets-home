import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { getMyEvents, getIncomingTransfers, acceptIncomingTransfers } from '../../utilities/api';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyEventsSlider } from '../Slider/MyEventsSlider';

export default function MyEventsWrapper() {
	const [
		order,
		setOrder
	] = useState({
		past: [],
		upcoming: []
	});

	const [transfers, setTransfers] = useState([])

	const getMyTickets = () => {
		getMyEvents()
			.then((res) => {
				let upcoming = [];
				let past = [];

				res.data.map((o) => {
					if (moment(o.event.start) >= moment() && o.tickets.length >= 1) upcoming.push(o);
					if (moment(o.event.start) < moment() && o.tickets.length >= 1) past.push(o);
				});

				setOrder({
					past,
					upcoming
				});
			})
			.catch((err) => console.error(err));

		getIncomingTransfers()
			.then((res) => setTransfers(res.data))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getMyTickets()
	}, []);

	const acceptTransfer = (transfer) => {
		let data = {
			transferId: transfer.id
		}
		acceptIncomingTransfers(data)
			.then((res) => getMyTickets())
			.catch((err) => console.error(err))
	}

	return (
		<section className="spacer-xs">
			<div className="section-heading-sm">
				<h1>My Events</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<MyEventsSlider order={order} transfers={transfers} acceptTransfer={acceptTransfer}  />
		</section>
	);
}
