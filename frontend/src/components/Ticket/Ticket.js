import React, { useState } from 'react';
import { EventModal } from './EventModal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import profile from '../../assets/profile-thumbnail.png';
import info from '../../assets/icons/info.svg';

import './ticket.scss';

export default function Ticket() {
	const [
		show,
		setShow
	] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="ticket">
			<header>
				<Row gap={2} className="py-2 py-md-3 align-items-center">
					<Col md={2} id="artist-image-col" className="tablet-desktop-only">
						<img
							src={profile}
							alt="Nic Fanciulli"
							width="139"
							height="139"
							className="artist-image"
						/>
					</Col>
					<Col xs={6} md={2} lg={4} xl={6} className="d-flex flex-column details">
						<h1 className="normal-lg artist-name">Nic Fanciulli</h1>
						<p className="caption--uppercase subtitle text-muted tablet-desktop-only">
							Coda, Platform, Floh, &amp; Embrace Presents:
						</p>
						<Row>
							<Col className="details-heading tablet-desktop-only" md={2}>
								<p className="time-caption">Time</p>
							</Col>
							<Col>
								<p className="small">
									Mar 13 <span className="time">9:00 PM</span>
								</p>
							</Col>
						</Row>
						<Row>
							<Col className="details-heading tablet-desktop-only" md={2}>
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
							<Col className="details-heading" md={2}>
								<p className="location-caption location">Location</p>
							</Col>
							<Col>
								<p className="small">
									Toronto, ON or Full address of Venue goes here
								</p>
							</Col>
						</Row>
					</Col>
					<Col className="align-self-md-end ">
						<Button
							variant="default"
							size="sm"
							className="btn--info"
							onClick={handleShow}>
							<img src={info} alt="" />
							<span className="tablet-desktop-only">Event description</span>
						</Button>

						<EventModal show={show} handleClose={handleClose} />
					</Col>
				</Row>
			</header>
		</div>
	);
}
