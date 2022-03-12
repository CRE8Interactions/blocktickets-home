import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import profile from '../../assets/01.png';

import './ticket.scss';

export default function Ticket() {
	return (
		<div className="ticket">
			<header>
				<Row className="py-3">
					<Col xs={4} md={2} className="desktop-only">
						<img src={profile} alt="image" className="banner-image" />
					</Col>
					<Col xs={11} md={6} className="d-flex flex-column details">
						<h1 className=" artist-name">Nic Fanciulli</h1>
						<p className="caption--uppercase subtitle text-muted">
							Coda, Platform, Floh, &amp; Embrace Presents:
						</p>
						<Row>
							<Col xs={4} md={3}>
								<p className="time-caption">Time</p>
							</Col>
							<Col>
								<p className="date small">Mar 13 9:00 PM</p>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={3}>
								{' '}
								<p className="venue-caption">Venue</p>
							</Col>
							<Col>
								<p className=" venue small">CODA</p>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={3}>
								{' '}
								<p className="location-caption location">Location</p>
							</Col>
							<Col>
								<p className=" date small">
									Toronto, ON or Full address of Venue goes here
								</p>
							</Col>
						</Row>
					</Col>
				</Row>
			</header>
		</div>
	);
}
