import React, { Fragment } from 'react';
import { Venues, Hero, Events, Footer } from '../../components';

import './homePage.scss';

export default function HomePage() {
	return (
		<Fragment>
			<main>
				<Hero />
				<Events />
				<Venues />
			</main>
			<Footer />
		</Fragment>
	);
}
