import React, { Fragment, useContext, useEffect } from 'react';

import Card from 'react-bootstrap/Card';

import { EventCardBody } from './EventCardBody';
import { VenueCardBody } from './VenueCardBody';

import './card.scss';

export default function MyCard({ prefix }) {
	return (
		<Card>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>{prefix === 'events' ? <EventCardBody /> : <VenueCardBody />}</Card.Body>
		</Card>
	);
}
