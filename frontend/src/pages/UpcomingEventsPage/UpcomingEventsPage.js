import React, { useEffect, useState } from 'react';
import { getMyEvents } from '../../utilities/api';

import { SwiperNavigationButtons, UpcomingEventsSlider } from '../../components';

export default function UpcomingEventsPage() {
	const [order, setOrder] = useState('')
	useEffect(() => {
		getMyEvents()
			.then((res) => setOrder(res.data))
			.catch((err) => console.error(err))
	}, [])
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Upcoming Events</h1>
				<SwiperNavigationButtons />
			</div>
			<UpcomingEventsSlider order={order} />
		</section>
	);
}
