import React from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { VenuesSlider } from './../Slider/VenuesSlider';

import './venues.scss';

export default function Venues(props) {
	const { venues } = props;

	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Venues</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<VenuesSlider venues={venues} />
			</div>
		</section>
	);
}
