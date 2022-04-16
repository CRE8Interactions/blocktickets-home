import React from 'react';

import Card from 'react-bootstrap/Card';

import { EventCardBody } from './EventCardBody';
import { VenueCardBody } from './VenueCardBody';

import './card.scss';

export default function MyCard({ prefix, type, venue, event }) {

	return (
		<Card className="myCard">
				{prefix === 'event' ? <Card.Img variant="top" src={ event?.image?.url } width="100" height="180" /> : <Card.Img variant="top" src={ venue?.image[0]?.url } width="100" height="180" />}
			<Card.Body>
				{prefix === 'event' ? <EventCardBody type={type} event={event} /> : <VenueCardBody venue={venue} />}
			</Card.Body>
		</Card>
	);
}
