import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ActionBtns } from '../ActionBtns';

import scanQR from '../../../assets/icons/scan-qr-code.svg';

import './myTickets.scss';

export default function MyTickets({ id, handleClick, ticketStatus }) {
	return (
		<section id="my-tickets">
			<div className="heading--flex mb-4">
				<h2 className="fs-md">Tickets (4)</h2>
				<ActionBtns handleClick={handleClick} ticketStatus={ticketStatus} />
			</div>
			<Alert variant="info">
				<img src={scanQR} width="44" height="44" alt="" />
				<div className="flex-1">
					<p className="fw-medium">Your phone is your ticket</p>
					<p className="caption">
						Sign in to Blocktickets on your phone and go to My Events and then click
						Event details
					</p>
				</div>
			</Alert>
			<Stack gap={3} className="mt-4">
				<Card body className="card--light">
					<div className="heading--flex">
						<Card.Title as="h5" className="normal">
							General Admissions
						</Card.Title>
						<Button variant="link">Details</Button>
					</div>
				</Card>
				<Card body className="card--light">
					<div className="heading--flex">
						<Card.Title as="h5" className="normal">
							General Admissions
						</Card.Title>
						<Button variant="link">Details</Button>
					</div>
				</Card>
				<Card body className="card--light">
					<div className="heading--flex">
						<Card.Title as="h5" className="normal">
							General Admissions
						</Card.Title>
						<Button variant="link">Details</Button>
					</div>
				</Card>
				<Card body className="card--light">
					<div className="heading--flex">
						<Card.Title as="h5" className="normal">
							General Admissions
						</Card.Title>
						<Button variant="link">Details</Button>
					</div>
				</Card>
			</Stack>
		</section>
	);
}
