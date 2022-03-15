import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import profile from '../../assets/profile-thumbnail.png';

import './ticket.scss';

export default function Ticket() {
	return (
		<div className="ticket">
			<header>
				<Row gap={2} className="py-3 align-items-center">
					<Col md={2} id="artist-image-col" className="tablet-desktop-only">
						<img
							src={profile}
							alt="Nic Fanciulli"
							width="139"
							height="139"
							className="artist-image"
						/>
					</Col>
					<Col md={6} className="d-flex flex-column details">
						<h1 className="artist-name">Nic Fanciulli</h1>
						<p className="caption--uppercase subtitle text-muted tablet-desktop-only">
							Coda, Platform, Floh, &amp; Embrace Presents:
						</p>
						<Row>
							<Col className="tablet-desktop-only" md={3} xl={2}>
								<p className="time-caption">Time</p>
							</Col>
							<Col>
								<p className="small">
									Mar 13 <span className="time">9:00 PM</span>
								</p>
							</Col>
						</Row>
						<Row>
							<Col className="tablet-desktop-only" md={3} xl={2}>
								{' '}
								<p className="venue-caption">Venue</p>
							</Col>
							<Col>
								<p className="small">
									CODA<span className="loc mobile-only">
										Toronto, ON or Full address of Venue goes here
									</span>
								</p>
							</Col>
						</Row>
						<Row className="tablet-desktop-only--flex">
							<Col md={3} xl={2}>
								<p className="location-caption location">Location</p>
							</Col>
							<Col>
								<p className="small">
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
