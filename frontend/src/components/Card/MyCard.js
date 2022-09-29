import React from 'react';

import Card from 'react-bootstrap/Card';

import { EventCardBody } from './EventCardBody';
import { VenueCardBody } from './VenueCardBody';

import './card.scss';

export default function MyCard({ prefix, venue, event }) {

    return (
        <Card className="myCard">
            <Card.Img variant="top" src={prefix == 'event' ? event?.image?.url : venue?.image[0]?.url} width="254" height="303" />
            <Card.Body>
                {prefix === 'event' ? <EventCardBody event={event} /> : <VenueCardBody venue={venue} />}
            </Card.Body>
        </Card>
    );
}
