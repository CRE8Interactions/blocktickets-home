import React, { useContext, useEffect } from 'react';
// import UserContext from '../../context/User/user';
import { Venues, Hero, Events } from '../../components';

import './homePage.scss';

export default function HomePage() {
	// const user = useContext(UserContext);

	return (
		<main>
			<Hero />
			<Events />
			<Venues />
		</main>
	);
}
