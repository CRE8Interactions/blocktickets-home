import React from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { EventsSlider } from './../Slider/EventsSlider';

import './events.scss';

export default function Events() {
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Trending Events</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<EventsSlider />
			</div>
		</section>
	);
}
