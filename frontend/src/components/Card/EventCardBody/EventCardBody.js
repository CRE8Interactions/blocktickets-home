import React, { Fragment, useContext, useEffect, useState } from 'react';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { IconButton } from '../../IconButton';

export default function EventCardBody({ event }) {

    return (
        <Fragment>
            <Card.Title as="h5">{event?.name}</Card.Title>
            <Card.Subtitle as="h6">{event?.venue?.name}</Card.Subtitle>
            <hr />
            <ul>
                <li>
                    <Row>
                        <span className="col caption">{moment(event?.start).format('MMM DD h:mmA')}</span>
                        <span className="col caption text-end">{event?.venue?.address[0]?.city}, {event?.venue?.address[0]?.state}</span>
                    </Row>
                </li>
            </ul>
            <IconButton
                variant="outline-light"
                styles="text-primary"
                link={`tickets/${event?.uuid}`}
                btn="tickets--primary">
                Get Tickets
            </IconButton>
        </Fragment>
    );
}
