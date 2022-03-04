import React, { Fragment, useContext, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { IconButton } from '../../IconButton';

import './eventCardBody.scss';

export default function EventCardTop() {
	return (
		<Fragment>
			<Card.Title>Dua Lipa: The future Nostalgic Tour</Card.Title>
			<Card.Subtitle>Coda venue with a long long name</Card.Subtitle>
			<hr />
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end">Toronto, CA</span>
			</Row>
			<IconButton variant="outline-light" styles="text-secondary">
				Get Tickets
			</IconButton>
		</Fragment>
	);
}
