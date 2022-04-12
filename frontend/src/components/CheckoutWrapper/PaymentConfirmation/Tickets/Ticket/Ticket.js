import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';

import profile from '../../../../../assets/profile-thumbnail.png';

import './ticket.scss';

export default function Ticket() {
	return (
		<Row>
			<Col md={2} id="artist-image-col">
				<img
					src={profile}
					alt="Nic Fanciulli"
					width="139"
					height="139"
					className="artist-image"
				/>
			</Col>
			<Col xs={6} md={2} lg={4} xl={6} className="d-flex flex-column details">
				<Stack>
					<h1 className="artist-name fw-bold">Nic Fanciulli</h1>
					<p className="small mb-md-1">
						Mar 13 <span className="time">9:00 PM</span>
					</p>
					<p className="small">
						CODA<span className="loc">
							Toronto, ON or Full address of Venue goes here
						</span>
					</p>
					<p className="mt-auto text-primary small">General Admission</p>
				</Stack>
			</Col>
		</Row>
	);
}
