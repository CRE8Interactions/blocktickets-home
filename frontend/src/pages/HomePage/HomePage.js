import React, { Fragment } from 'react';
import { Venues, Hero, Events, Footer } from '../../components';

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
