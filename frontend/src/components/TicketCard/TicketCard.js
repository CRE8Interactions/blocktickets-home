import React, { useState, Fragment } from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

import profile from '../../assets/profile.svg';

import { TicketModal } from './TicketModal';

import './ticketCard.scss';

export default function TicketCard({ ticketType = '' }) {
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
						Ticket options
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
							View NFT
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
							<Dropdown.Item as="button" onClick={() => setTicketStatus('sell')}>
								Delist Ticket
							</Dropdown.Item>
						)}
					</DropdownButton>
				</div>
				<Card.Img
					variant="top"
					src={profile}
					width="281"
					height="281"
					className="rounded-lg mb-4"
				/>
				<div className="details d-flex-column">
					<Card.Title as="h5">Nic Fanciulli</Card.Title>
					<Card.Subtitle as="h6" className="caption--uppercase text-muted">
						FLOH &amp; Embrace Presents:
					</Card.Subtitle>
					<ListGroup as="ul" className="">
						<ListGroup.Item as="li" className="date small">
							Mar 13 9:00 PM EST
						</ListGroup.Item>
						<ListGroup.Item as="li" className="venue small">
							CODA
						</ListGroup.Item>
						<ListGroup.Item as="li" className="location small">
							Toronto, ON
						</ListGroup.Item>
					</ListGroup>
					{ticketType !== 'collectable' && (
						<Stack gap={2}>
							<Badge bg="info" className="text-dark badge-lg">
								General Admission
							</Badge>
							<Button
								variant="secondary"
								size="lg"
								disabled={ticketStatus === 'sale'}>
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
