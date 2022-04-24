import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getMyEvents } from '../../utilities/api';
import { MyEvents } from '../../components/MyEvents';
import moment from 'moment';

import { SwiperNavigationButtons, UpcomingEventsSlider } from '../../components';

export default function UpcomingEventsPage() {
	const [order, setOrder] = useState({
		past: [],
		upcoming: []
	})

	useEffect(() => {
		getMyEvents()
			.then((res) => {
				let upcoming = []
				let past = []
				
				console.log(res.data)
				res.data.map(o => {
					if (moment(o.event.start) >= moment()) upcoming.push(o)
					if (moment(o.event.start) < moment()) past.push(o)
				})

				setOrder({
					past,
					upcoming
				})
			})
			.catch((err) => console.error(err))
	}, [])
	return (
		<section className="spacer">
			<div className="section-heading">
		 		<h1>My Events</h1>
		 	</div>
			 <>
			 <Tabs defaultActiveKey="upcoming" id="my-events-tab" className="mb-3">
					<Tab eventKey="upcoming" title="Upcoming">
						<MyEvents orders={order.upcoming} type={'upcoming'} />
					</Tab>
					<Tab eventKey="past" title="Past Events">
						<MyEvents orders={order.past} type={'past'} />
					</Tab>
				</Tabs>
			 </>
		</section>
	);
}
