import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { getMyEvents } from '../../utilities/api';

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
		<section className="spacer-xs" id="my-events-wrapper">
			<div className="section-heading-sm">
				<h1>My Events</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<MyEventsSlider />
		</section>
	);
}
