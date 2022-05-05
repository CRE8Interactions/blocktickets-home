import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getMyEvents } from '../../utilities/api';

import Stack from 'react-bootstrap/Stack';

import { UpcomingEventsSlider } from '../../components';

export default function UpcomingEventsPage() {
	const [
		order,
		setOrder
	] = useState({
		past: [],
		upcoming: []
	});

	useEffect(() => {
		getMyEvents()
			.then((res) => {
				let upcoming = [];
				let past = [];

				res.data.map((o) => {
					if (moment(o.event.start) >= moment()) upcoming.push(o);
					if (moment(o.event.start) < moment()) past.push(o);
				});

				setOrder({
					past,
					upcoming
				});
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<section className="spacer-xs">
			<h1 className="heading-sm">My Events</h1>
			<UpcomingEventsSlider />
			<Stack
				direction="horizontal"
				gap={3}
				className="btn-group-flex justify-content-center align-items-center">
				<Link to="" className="btn btn-dark">
					My listings
				</Link>
				<Link to="" className="btn btn-dark">
					My transfers
				</Link>
			</Stack>
		</section>
	);
}
