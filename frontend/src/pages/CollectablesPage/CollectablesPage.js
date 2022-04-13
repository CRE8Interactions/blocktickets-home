import React from 'react';

import { SwiperNavigationButtons, CollectablesSlider } from '../../components';

export default function CollectablesPage() {
	return (
		<section className="spacer">
			<div className="section-heading">
				<h1>Collectables</h1>
				<SwiperNavigationButtons />
			</div>
			<CollectablesSlider />
		</section>
	);
}
