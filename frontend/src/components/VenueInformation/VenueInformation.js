import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { VenueCard } from './VenueCard';
import { VenueList } from './VenueList';

import './venueInformation.scss';

export default function VenueInformation() {
	return (
		<div id="venue">
			<Row className="gap-3">
				<Col md={5} lg={4} xxl={3}>
					<VenueCard />
				</Col>
				<Col md={6} xxl={6} className="flex-grow-1">
					<h1 className="fs-md scrollable-heading">Upcoming Events</h1>
					<div className="scrollable-container">
						<VenueList />
					</div>
				</Col>
				<ul />
			</Row>
		</div>
	);
}
