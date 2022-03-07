import React from 'react';
import { Venues, Hero, Events, Footer } from '../../components';

import './homePage.scss';

export default function HomePage() {
	return (
		<main>
			<Hero />
			<Events />
			<Venues />
			<Footer />
		</main>
	);
}
