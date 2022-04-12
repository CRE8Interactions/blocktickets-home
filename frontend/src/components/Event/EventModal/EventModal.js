import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import profile from '../../../assets/profile-thumbnail.png';

import './eventModal.scss';

export default function EventModal({ show, handleClose }) {
	return (
		<div className="modal">
			<Modal scrollable centered fullscreen="md-down" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title as="h4">Event information</Modal.Title>
				</Modal.Header>
				<div className="event-details mb-3">
					<Row className="align-items-center mb-2">
						<Col>
							<h1 className="m-0 heading-sm">Nic Fancuilli</h1>
						</Col>
						<Col className="d-flex align-self-center">
							<Badge className="ms-auto badge-outline badge-outline--primary">
								Concert
							</Badge>
						</Col>
					</Row>
					<div className="mb-2">
						<p className="time-caption">Time</p>
						<p className="normal-sm">Mar 13 9:00 PM - 11:00 EST</p>
					</div>
					<div className="mb-2">
						<p className="venue-caption">Venue</p>
						<p className="normal-sm">CODA or Full address of Venue goes here</p>
					</div>
					<div>
						<p className="location-caption">Location</p>
						<p className="normal-sm">
							<span className="loc" />Toronto, ON <a href="">Directions</a>
						</p>
					</div>
				</div>
				<Modal.Body className="show-grid">
					<div>
						<img
							src={profile}
							alt="Nic Fanciulli"
							width="225"
							height="225"
							className="artist-image mb-3"
						/>
						<h4 className="normal mb-2">Additional Info</h4>
						<p>
							Important Message Regarding COVID-19 - Due to the uncertainty related to
							COVID-19, the holder of this ticket, on behalf of the holder and any
							accompanying minor, including a minor holding a separate ticket,
							acknowledges and agrees that admission to the Arena is subject to all
							safety and health requirements and policies, as well as any additional
							terms and conditions established by the Arena. Such terms may be updated
							from time to time (in the sole determination of the Arena). Please
							continue to visit the FTX Arena website for the most up to date
							information on the Arena health and safety measures. FTX Arena Official
							Website{' '}
						</p>{' '}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
