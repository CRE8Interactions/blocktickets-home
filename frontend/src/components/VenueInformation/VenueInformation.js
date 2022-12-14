import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { VenueBanner } from './VenueBanner';
import { VenueCard } from './VenueCard';
import { EventsList } from './EventsList';

import './venueInformation.scss';

export default function VenueInformation({ venue }) {
	const [
		key,
		setKey
	] = useState('upcoming');

	return (
		<div id="venue">
			{venue && (
			<>
			<header>
				<VenueBanner venue={venue} />
			</header>
			<section className="spacer-xs">
				<Row className="gap-5 gap-md-3">
					<Col md={5} lg={4} xxl={3}>
						<VenueCard venue={venue} />
					</Col>
					<Col md={6} xxl={6} className="flex-grow-1">
						<Tabs
							defaultActiveKey="upcoming"
							variant="pills"
							activeKey={key}
							onSelect={(k) => setKey(k)}
							>
							<Tab eventKey="upcoming" title="Upcoming Events">
								<EventsList venue={venue} />
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</section>
			</>
			)}
		</div>
	);
}
