import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function ReminderModal({ handleClose }) {
	return (
		<Modal.Body>
			<h1 className="modal-body-heading-title">Complete your purchase</h1>
			<p>Tickets are selling fast. Get yours now before they're gone.</p>
			<Stack className="btn-group-flex">
				<Button onClick={handleClose} size="lg">
					Got it!
				</Button>
			</Stack>
		</Modal.Body>
	);
}
