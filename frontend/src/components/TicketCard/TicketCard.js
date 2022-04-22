import React, { useState, Fragment } from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import * as moment from 'moment';

import profile from '../../assets/profile.svg';

import { TicketModal } from './TicketModal';

import './ticketCard.scss';

export default function TicketCard({ ticketType = '', order }) {
	const [
		modalType,
		setModalType
	] = useState('');

	const [
		ticketStatus,
		setTicketStatus
	] = useState('sell');

	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleClick = (type) => {
		setModalType(type);
		handleShow();
	};

	return (
		<Fragment>
			<Card body className="ticket-card card-md">
				<div className="heading--flex pb-2">
					<h1 className="caption text-muted fw-normal m-0" id="options">
						{ticketType !== 'collectable' ? 'Ticket' : 'NFT'} options
					</h1>
					<DropdownButton
						id="dropdown-basic-button"
						title=""
						aria-labelledby="#options"
						variant="default"
						align="end">
						<Dropdown.Item as="button" onClick={() => handleClick('details')}>
							Details
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={() => handleClick('nft')}>
							View NFT Media
						</Dropdown.Item>
						{ticketType !== 'collectable' &&
						ticketStatus === 'sell' && (
							<Fragment>
								<Dropdown.Item as="button" onClick={() => handleClick('transfer')}>
									Transfer ticket
								</Dropdown.Item>
								<Dropdown.Item as="button" onClick={() => handleClick('sell')}>
									Sell ticket
								</Dropdown.Item>
							</Fragment>
						)}

						{ticketType !== 'collectable' &&
						ticketStatus === 'sale' && (
							<Dropdown.Item as="button" onClick={() => handleClick('delist')}>
								Edit / Delist Ticket
							</Dropdown.Item>
						)}
					</DropdownButton>
				</div>
				<Card.Img
					variant="top"
					src={order?.event?.image?.url}
					width="281"
					height="281"
					className="rounded-lg mb-4"
				/>
				<div className="details d-flex-column">
					<Card.Title as="h5"></Card.Title>
					<Card.Subtitle as="h6" className="caption--uppercase text-muted">
						{order?.event?.presentedBy}
					</Card.Subtitle>
					<Stack className="event-details">
						<p className="event-detail date small">{moment(order?.event?.start).format('MMM DD h:mm A')} EST</p>
						<p className="event-detail venue small">{order?.event?.venue?.name}</p>
						<p className="event-detail location small">{order?.event?.venue?.address[0]?.city}, {order?.event?.venue?.address[0]?.state}</p>
					</Stack>
					{ticketType !== 'collectable' && (
						<Stack gap={2}>
							<Badge bg="info" className="text-dark badge-lg">
								{order.tickets[0]?.generalAdmission === true ? 'General Admission' : 'Seated'}
							</Badge>
							<Button variant="dark" size="lg" disabled={ticketStatus === 'sale'}>
								Check in
							</Button>
						</Stack>
					)}
				</div>
			</Card>

			<TicketModal
				modalType={modalType}
				show={show}
				setShow={setShow}
				ticketStatus={ticketStatus}
				setTicketStatus={setTicketStatus}
			/>
		</Fragment>
	);
}
