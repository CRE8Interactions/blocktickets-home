import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import QRCode from '../../assets/qrcode.svg'; 
import profile from '../../assets/profile-thumbnail.png'; 

import './ticketCard.scss';

export default function TicketCard({ id, ticketType = '', order, ticket }) {
	// const [
	// 	modalType,
	// 	setModalType
	// ] = useState('');

	// const [
	// 	ticketStatus,
	// 	setTicketStatus
	// ] = useState('sell');

	// const [
	// 	show,
	// 	setShow
	// ] = useState(false);

	// const handleShow = () => setShow(true);

	// const handleClick = (type) => {
	// 	setModalType(type);
	// 	handleShow();
	// };

	return (
		<Fragment>
			<Card body className="ticket-card card-md">
				<Card.Img
					src={id ? QRCode : profile}
					width="217"
					height="217"
					className="event-image-lg mb-4"
				/>
				<div className="details d-flex-column">
					<Card.Title as="h5">Nic Fanciulli</Card.Title>
						<p className="event-details">
						Jun 20 <span>{moment(order?.event?.start).format('h:mm A')} </span><span className="venue">Southside Music Hall</span> <span className="loc">
						Dallas, TX
						</span>
					</p>
					
					{ !id && ( <span className="num-tickets">4 Tickets</span> )}
					{ticketType !== 'collectable' && (					<>
							{ id ? (
								<>
							<Badge bg="info" className="mt-2 text-dark badge-lg">
								General Admission
							</Badge>
								<Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
							<Button variant="info" id="apple-wallet-btn" aria-label="Add to Apple Wallet" className="br-lg"></Button>
							<Link to="" className="btn btn-outline-light">Details</Link>
							</Stack>
							</>
							) : (
								
							<Link to="/my-tickets/100" className="btn btn-primary">
								View Tickets
							</Link>
							)}
							</>
					)}
				</div>
			</Card>

		</Fragment>
	);
}
