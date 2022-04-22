import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ReminderModal({ handleClose }) {
	return (
		<Modal.Body>
			<div className="modal-heading">
				<h1 className="modal-heading-title">Complete your purchase</h1>

				<p>Tickets are selling fast. Get yours now before they're gone.</p>
			</div>
			<Button onClick={handleClose}>Got it!</Button>
		</Modal.Body>
	);
}
