import React, { Fragment, useContext, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { IconButton } from '../../IconButton';

import './eventCardBody.scss';

export default function EventCardBody({ type = '' }) {
	return (
		<Fragment>
			<Card.Title as="h5">Dua Lipa: The future Nostalgic Tour</Card.Title>
			<Card.Subtitle as="h6">Coda venue with a long long name</Card.Subtitle>
			<hr />
			<Row>
				<span className="col caption">Mar 13 9:30PM</span>
				<span className="col caption text-end">Toronto, CA</span>
			</Row>
			<IconButton
				variant="outline-light"
				styles="text-primary"
				link={`tickets/1?type=${type}`}
				btn="tickets--primary">
				Get Tickets
			</IconButton>
		</Fragment>
	);
}
