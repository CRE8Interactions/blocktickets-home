import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import './venueCardBody.scss';

export default function EventCardTop() {
	return (
		<Fragment>
			<Card.Title as="h5">Celebrities nightclub Venue</Card.Title>
			<Card.Text as="p">Toronto, ON</Card.Text>
			<hr />
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end fw-bold">Nic Fanciulli</span>
			</Row>
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end fw-bold">Artist with long name</span>
			</Row>
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end fw-bold">Another Artist</span>
			</Row>
			<Link to={''} className="btn btn-outline-light text-primary btn-sm">
				View All
			</Link>
		</Fragment>
	);
}
