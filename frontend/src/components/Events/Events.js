import React from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { EventsSlider } from './EventsSlider';

import './events.scss';

export default function Events(props) {
	const { events } = props;

	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Trending Events</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<EventsSlider events={events} />
			</div>
		</section>
	);
}
