import React from 'react';

import { SwiperNavigationButtons, UpcomingEventsSlider } from '../../components';

export default function UpcomingEventsPage() {
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Upcoming Events</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<UpcomingEventsSlider />
			</div>
		</section>
	);
}
