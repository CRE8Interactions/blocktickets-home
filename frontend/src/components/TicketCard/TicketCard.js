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

export default function TicketCard() {
	const [
		modalType,
		setModalType
	] = useState('');

	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleOnClick = (type) => {
		setModalType(type);
		handleShow();
	};
	return (
		<Fragment>
			<Card className="ticket-card card-md">
				<Card.Header className="heading--flex">
					<h1 className="normal m-0" id="options">
						Ticket options
					</h1>
					<DropdownButton
						id="dropdown-basic-button"
						title=""
						aria-labelledby="#options"
						variant="default"
						align="end">
						<Dropdown.Item as="button" onClick={() => handleOnClick('details')}>
							Details
						</Dropdown.Item>
						<Dropdown.Item as="button">View NFT media</Dropdown.Item>
						<Dropdown.Item as="button" onClick={() => handleOnClick('transfer')}>
							Transfer ticket
						</Dropdown.Item>
						<Dropdown.Item as="button">Sell ticket</Dropdown.Item>
					</DropdownButton>
				</Card.Header>
				<Card.Img
					variant="top"
					src={profile}
					width="281"
					height="281"
					className="rounded-lg px-3 pt-3"
				/>
				<Card.Body className="details d-flex-column">
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
					<Stack gap={2}>
						<Badge bg="info" className="text-dark fw-medium normal p-3 rounded-lg">
							General Admission
						</Badge>
						<Button variant="dark" size="lg">
							Check in
						</Button>
					</Stack>
				</Card.Body>
			</Card>

			<TicketModal modalType={modalType} show={show} setShow={setShow} />
		</Fragment>
	);
}
