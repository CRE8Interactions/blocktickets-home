import React from 'react';
import { Venues, Hero, Events } from '../../components';

import './homePage.scss';

export default function HomePage() {
	return (
		<main>
			<Hero />
			<Events />
			<Venues />
		</main>
	);
}
