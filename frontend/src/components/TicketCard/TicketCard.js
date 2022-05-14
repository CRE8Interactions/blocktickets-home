import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import QRCode from '../../assets/qrcode.svg'; 
import profile from '../../assets/profile-thumbnail.png'; 
import addToWallet from '../../assets/icons/add-to-apple-wallet-logo.svg'

import './ticketCard.scss';

export default function TicketCard({ id, ticketType = '', order, tickets, event }) {
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
					src={event?.image.url}
					width="217"
					height="217"
					className="event-image-lg mb-3"
				/>
				<div className="details d-flex-column">
					<Card.Title as="h5">{event?.name}</Card.Title>
						<p className="event-details">
						{moment(event?.start).format('MMM DD')} <span>{moment(event?.start).format('h:mm A')} </span><span className="venue">{event?.venue.name}</span> <span className="loc">
						Dallas, TX
						</span>
					</p>
					
					{ !id && ( <span className="num-tickets">{tickets?.length} Tickets</span> )}
					{ticketType !== 'collectable' && (					<>
							{ id ? (
								<>
							<Badge bg="light" className="mt-2 text-dark badge-lg">
								General Admission
							</Badge>
								<Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
							<Button variant="info" id="apple-wallet-btn" aria-label="Add to Apple Wallet" className="br-lg">
							</Button>
							<Link to="" className="btn btn-outline-light">Details</Link>
							</Stack>
							</>
							) : (
								
							<Link to={`/event-details/${order?.id}`} className="btn btn-primary">
								Event details
							</Link>
							)}
							</>
					)}
				</div>
			</Card>

		</Fragment>
	);
}
