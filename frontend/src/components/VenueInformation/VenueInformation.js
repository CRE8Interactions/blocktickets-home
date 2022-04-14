import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { VenueCard } from './VenueCard';
import { VenueList } from './VenueList';

import './venueInformation.scss';

export default function VenueInformation() {
	const [
		key,
		setKey
	] = useState('upcoming');
	return (
		<div id="venue">
			<Row className="gap-5 gap-md-3">
				<Col md={5} lg={4} xxl={3}>
					<VenueCard />
				</Col>
				<Col md={6} xxl={6} className="flex-grow-1">
					<Tabs
						id="controlled-tab"
						defaultActiveKey="upcoming"
						variant="pills"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-4">
						<Tab eventKey="upcoming" title="Upcoming Events">
							<VenueList />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</div>
	);
}
