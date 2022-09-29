import React from 'react';
import * as moment from 'moment';

import { formatDateTime, getStartDateFormatter, formatAddress } from '../../../utilities/helpers'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import './eventModal.scss';

export default function EventModal({ show, handleClose, event }) {
    return (
        <Modal id="event-modal" scrollable centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton className='mb-0'>
                <Modal.Title as="h4">Event description</Modal.Title>
            </Modal.Header>
            <div className="event-details mb-3">
                <Row className="justify-content-between align-items-center mb-2">
                    <Col xs={8} className="flex-grow-1">
                        <h1 className="event-name m-0 heading-sm">{event?.name}</h1>
                    </Col>
                    <Col xs='auto' className="d-flex align-self-center">
                        <Badge className="ms-auto badge-outline badge-outline--primary">
                            {/* {event?.categories[0]?.name} */}
                        </Badge>
                    </Col>
                </Row>
                <div className="mb-2">
                    <span className="time-caption">Time</span>
                    <span className="normal-sm">
                        {formatDateTime(moment(event?.start), getStartDateFormatter(event))} {!event?.hide_end_date && (<span>- {formatDateTime(moment(event?.end), 'timeOnly')}</span>)}
                    </span>
                </div>
                <div className="mb-2">
                    <span className="venue-caption">Venue</span>
                    <span className="normal-sm">{event?.venue?.name}</span>
                </div>
                <div>
                    <span className="location-caption">Location</span>
                    <span className="normal-sm">
                        {formatAddress(event?.venue?.address[0])} <a href="">Directions</a>
                    </span>
                </div>
            </div>
            <Modal.Body>
                <img
                    src={event?.image?.url}
                    alt={event?.name}
                    width="225"
                    height="225"
                    className="event-image mb-3"
                />
                <h4 className="normal mb-2">Additional info</h4>
                <pre>
                    {event?.summary}
                </pre>
            </Modal.Body>
        </Modal>
    );
}
