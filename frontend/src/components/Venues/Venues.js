import React, { Fragment, useContext, useEffect } from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { Slider } from '../Slider';

import './venues.scss';

export default function Venues() {
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Venues</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<Slider prefix="venues" />
			</div>
		</section>
	);
}
