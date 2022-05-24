import React from 'react';
import * as moment from 'moment';

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
								{event?.categories[0]?.name}
							</Badge>
						</Col>
					</Row>
					<div className="mb-2">
						<p className="time-caption">Time</p>
						<p className="normal-sm">{moment(event?.start).format('MMM DD h:mm A')} - {moment(event?.end).format('h:mm A')} EST</p>
					</div>
					<div className="mb-2">
						<p className="venue-caption">Venue</p>
						<p className="normal-sm">{ event?.venue?.name }</p>
					</div>
					<div>
						<p className="location-caption">Location</p>
						<p className="normal-sm">
							{ event?.venue?.address[0]?.city}, { event?.venue?.address[0]?.state} <a href="">Directions</a>
						</p>
					</div>
				</div>
				<Modal.Body className="show-grid">
					<div>
						<img
							src={event?.image?.formats?.small?.url}
							alt={ event?.name }
							width="225"
							height="225"
							className="event-image mb-3"
						/>
						<h4 className="normal mb-2">Additional Info</h4>
						<p>
							{ event?.summary }{' '}
						</p>{' '}
					</div>
				</Modal.Body>
			</Modal>
	);
}
