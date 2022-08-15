import React, { useEffect, useState } from 'react';
import { getEvents } from '../../utilities/api';
import { EventsWrapper } from '../../components';

export default function EventsPage() {
	const [events, setEvents] = useState()
	useEffect(() => {
		getEvents()
			.then((res) => setEvents(res.data))
			.catch((err) => console.error(err))
	}, [])
	return (
		<div className="spacer-md">
			<EventsWrapper events={events} />
		</div>
	);
}
