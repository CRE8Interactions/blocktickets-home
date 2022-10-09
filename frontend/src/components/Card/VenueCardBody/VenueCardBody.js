import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { formatShortDate, getStartDateFormatter } from "./../../../utilities/helpers";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import './venueCardBody.scss';

export default function EventCardTop(props) {
    const venue = props.venue;

    return (
        <Fragment>
            <Card.Title as="h5">{venue?.name}</Card.Title>
            <Card.Text as="p">{venue?.address[0].city}, {venue?.address[0].state}</Card.Text>
            <hr />
            <ul className='venue-list'>
                {venue && venue.allEvents &&
                    venue.allEvents.map((event, index) => {
                        return (
                            <li key={index}>
                                <Row>
                                    <span className="col caption">{formatShortDate(moment(event?.start), getStartDateFormatter(event), 'short')}</span>
                                    <span className="col caption text-end fw-bold">{event?.name}</span>
                                </Row>
                            </li>
                        )
                    })
                }
            </ul>
            <Card.Link
                as={Link}
                to={`/venue/${venue?.id}`}
                className="btn btn-outline-light text-primary btn-sm">
                View All
            </Card.Link>
        </Fragment>
    );
}
