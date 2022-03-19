import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import lock from '../../../../assets/icons/lock.svg';

import './ticketPresale.scss';

export default function TicketPresale({ handleClick }) {
	return (
		<div className="ticket-presale">
			<Stack gap={3} className="align-items-center justify-content-center p-5">
				<img src={lock} alt="" />
				<h1 className="normal text-left mb-0">
					Get early access to tickets during presale.
				</h1>
				<Form.Control placeholder="Enter passcode here" type="text" />
				<Button
					onClick={() => handleClick('quantity', 'genAdmission')}
					variant="secondary"
					size="lg"
					className="w-100">
					Unlock
				</Button>
			</Stack>
		</div>
	);
}
