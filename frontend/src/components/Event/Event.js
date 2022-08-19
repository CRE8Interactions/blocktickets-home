import React, { useState } from 'react';
import { EventModal } from './EventModal';
import * as moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { InfoIcon } from '../InfoIcon';

import './event.scss';

export default function Event(props) {
    const { event } = props;
    const [
        show,
        setShow
    ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="event">
            <header>
                <Row gap={2} className="py-2 pt-md-0 pb-md-3 align-items-center">
                    <Col md={2} id="event-image-col" className="image-wrapper tablet-desktop-only">
                        <img
                            src={event?.image?.url}
                            alt={event?.name}
                            width="139"
                            height="139"
                            className="event-image"
                        />
                    </Col>
                    <Col xs={6} md={2} lg={4} xl={6} className="d-flex flex-column details">
                        <h1 className="event-name">{event?.name}</h1>
                        <p className="subtitle tablet-desktop-only">
                            {event?.presentedBy}
                        </p>
                        <Row>
                            <Col className="details-heading tablet-desktop-only" md={2}>
                                <span className="time-caption">Time</span>
                            </Col>
                            <Col>
                                <p className="small">
                                    <span className='date'>{moment(event?.start).format('MMM')} {moment(event?.start).format('DD')}</span><span className="time">{moment(event?.start).format('h:mm A')} - {moment(event?.end).format('h:mm A')} EST</span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="details-heading tablet-desktop-only" md={2}>
                                <span className="venue-caption">Venue</span>
                            </Col>
                            <Col>
                                <p className="small">
                                    {event?.venue?.name}<span className="loc mobile-only">
                                        {event?.venue?.address[0]?.city}, {event?.venue?.address[0]?.state}
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="tablet-desktop-only">
                            <Col className="details-heading" md={2}>
                                <span className="location-caption location">Location</span>
                            </Col>
                            <Col>
                                <p className="small">
                                    {event?.venue?.address[0]?.city}, {event?.venue?.address[0]?.state}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="align-self-md-end ">
                        <Button
                            variant="default"
                            size="sm"
                            id="event-info"
                            className="btn--info"
                            onClick={handleShow}>
                            <InfoIcon />
                            <span className="tablet-desktop-only">Event description</span>
                        </Button>
                        {event &&
                            <EventModal show={show} handleClose={handleClose} event={event} />
                        }
                    </Col>
                </Row>
            </header>
        </div>
    );
}
