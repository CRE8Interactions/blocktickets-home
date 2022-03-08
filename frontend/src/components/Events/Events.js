import React, { Fragment, useContext, useEffect } from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';

import './events.scss';
import { Slider } from '../Slider';

export default function Events() {
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Trending Events</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<Slider prefix="events" />
			</div>
		</section>
	);
}
