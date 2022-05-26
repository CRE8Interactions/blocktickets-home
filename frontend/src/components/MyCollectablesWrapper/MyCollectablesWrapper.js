import React from 'react';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { MyCollectablesSlider } from '../Slider/MyCollectablesSlider';

export default function MyCollectablesWrapper() {
	return (
		<section className="spacer-xs" id="my-listings-wrapper">
			<div className="section-heading-sm">
				<h1>My Collectables</h1>
				<div className="tablet-desktop-only">
					<SwiperNavigationButtons />
				</div>
			</div>
			<MyCollectablesSlider />
		</section>
	);
}
