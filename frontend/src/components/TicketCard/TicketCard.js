import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TicketModal } from '../TicketCard/TicketModal';

import QRCode from '../../assets/qrcode.svg'; 
import profile from '../../assets/profile-thumbnail.png'; 

import './ticketCard.scss';

export default function TicketCard({ id, ticketType, ticketStatus, order, ticket }) {
	const [
		ticketAction,
		setTicketAction
	] = useState('');

	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleClick = (action) => {
		handleShow();
		setTicketAction(action)
	};

	return (
		<Fragment>
			<Card body className="ticket-card card-md">
				<Card.Img
					src={id ? QRCode : profile}
					width="217"
					height="217"
					className="event-image-lg mb-3"
				/>
				<div className="details d-flex-column">
					<Card.Title as="h5">Nic Fanciulli</Card.Title>
						<p className="event-details">
						Jun 20 <span>{moment(order?.event?.start).format('h:mm A')} </span><span className="venue">Southside Music Hall</span> <span className="loc">
						Dallas, TX
						</span>
					</p>
					{ ticketStatus === 'listed' && (
						<Stack className='mb-2'>
							<Stack direction="horizontal" className="split-row mb-1">
								<span className='m-0 caption'>Listing price per ticket</span>
								<span className='text-end fw-medium'>$1346.00</span>
							</Stack>
							<p className='caption text-muted'>You will make $1346.00 per ticket</p>
						</Stack>
					)}
					{ !id && ( <span className="num-tickets">4 Tickets</span> )}
					{ticketType !== 'collectable' && (					
					<>
					{/* ticketType or is specific ticket - transfers, listings, event details */}
							{ ticketStatus || id ? (
								<>
							<Badge bg="light" className="mt-2 text-dark badge-lg">
								General Admission
							</Badge>
								{ id && (<Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
							<Button variant="info" id="apple-wallet-btn" aria-label="Add to Apple Wallet" className="br-lg">
							</Button>
							<Button variant='outline-light' size="xs">Details</Button>
							</Stack>
								)
							}
							{ ticketStatus === 'listed' && (
								<Stack direction="horizontal" gap={3} className="mt-3 btn-group-flex">
							<Button onClick={() => handleClick('remove')}>Remove listing
							</Button>
							<Button onClick={() => handleClick('edit')} variant="outline-light" size="xs">Edit</Button>
							</Stack>
							)}
							</>
							) : (
								
							<Link to="/event-details/100" className="btn btn-primary">
								Event details
							</Link>
							)}
							</>
					)}
				</div>
			</Card>

			<TicketModal ticketAction={ticketAction} show={show} setShow={setShow} />

		</Fragment>
	);
}
