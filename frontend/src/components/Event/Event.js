import React, { useState } from 'react';
import * as moment from 'moment';

import { formatDateTime, getStartDateFormatter } from '../../utilities/helpers'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { InfoIcon } from '../InfoIcon';
import { EventModal } from './EventModal';

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
                        <p className="presenter-text tablet-desktop-only">
                            {event?.presentedBy}
                        </p>
                        <Row>
                            <Col className="details-heading tablet-desktop-only" md={2}>
                                <span className="time-caption">
                                    {event?.display_start_time &&
                                        <>Time</>
                                    }
                                    {!event?.display_start_time &&
                                        <>Date</>
                                    }

                                </span>
                            </Col>
                            <Col>
                                <p className="small">
                                    <span className='date'>
                                        {formatDateTime(moment(event?.start), getStartDateFormatter(event))} {!event?.hide_end_date && (<span>- {formatDateTime(moment(event?.end), 'timeOnly')}</span>)}
                                    </span>
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
