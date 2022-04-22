import React from 'react';
import * as moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';

import profile from '../../../../../assets/profile-thumbnail.png';

import './ticket.scss';

export default function Ticket({ticket, order}) {

	return (
		<Row>
			<Col md={2} id="artist-image-col">
				<img
					src={order?.event?.image?.url}
					alt={order?.event?.name}
					width="139"
					height="139"
					className="artist-image"
				/>
			</Col>
			<Col xs={6} md={2} lg={4} xl={6} className="d-flex flex-column details">
				<Stack>
					<h1 className="artist-name fw-bold">{order?.event?.name}</h1>
					<p className="small mb-md-1">
					{moment(order?.event?.start).format('MMM DD')} <span className="time">{moment(order?.event?.start).format('h:mm A')}</span>
					</p>
					<p className="small">
						{order?.event?.venue?.name}<span className="loc">
						{order?.event?.venue?.address[0]?.city}, {order?.event?.venue?.address[0]?.state}
						</span>
					</p>
					<p className="mt-auto text-primary small">{ticket.generalAdmission ? 'General Admission' : 'Seated'}</p>
				</Stack>
			</Col>
		</Row>
	);
}
