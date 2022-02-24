import React, { Fragment, useContext, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './venueCardBody.scss';

export default function EventCardTop() {
	return (
		<Fragment>
			<Card.Title>Celebrities nightclub Venue</Card.Title>
			<Card.Text>794 Bathurst Street Toronto, ON M5R 3G1</Card.Text>
			<hr />
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end bold">Nic Fanciulli</span>
			</Row>
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end bold">Artist with long name</span>
			</Row>
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end bold">Another Artist</span>
			</Row>
			<Button variant="outline-light" className="text-secondary btn--xsmall">
				View All
			</Button>
		</Fragment>
	);
}
