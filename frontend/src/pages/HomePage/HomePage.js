import React, { Fragment, useEffect, useState } from 'react';
import { Venues, Hero, Events, Footer } from '../../components';
import { getEvents, getVenues } from '../../utilities/api';

export default function HomePage() {
	const [events, setEvents] = useState()
	const [venues, setVenues] = useState()

	useEffect(() => {
		getEvents()
			.then((res) => setEvents(res.data))
			.catch((err) => console.error(err))
		
		getVenues()
			.then((res) => setVenues(res.data))
			.catch((err) => console.log(err))
	}, [])
	return (
		<Fragment>
			<main>
				<Hero events={events} />
				<Events events={events} />
				<Venues venues={venues} />
			</main>
			<Footer />
		</Fragment>
	);
}
