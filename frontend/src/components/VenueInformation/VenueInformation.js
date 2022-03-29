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
	] = useState('All');
	return (
		<div id="venue">
			<Row>
				<Col md={3}>
					<VenueCard />
				</Col>
				<Col md={9}>
					<Tabs
						variant="pills"
						id="controlled-tab-example"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">
						<Tab defaultActiveKey="/all" eventKey="all" title="All">
							<VenueList />
						</Tab>
						<Tab eventKey="upcoming" title="Upcoming" />
						<Tab eventKey="hottest" title="Hottest" />
					</Tabs>
				</Col>
				<ul />
			</Row>
		</div>
	);
}
