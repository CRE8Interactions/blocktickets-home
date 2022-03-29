import React, { Fragment } from 'react';

import { VenueInformation } from '../../components';

import './venues.scss';

export default function VenuePage() {
	return (
		<Fragment>
			<header class="jumbotron text-center">
				<h1>BG</h1>
			</header>
			<section className="spacer">
				<VenueInformation />
			</section>
		</Fragment>
	);
}
