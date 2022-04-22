import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TimeoutModal({ handleClose }) {
	return (
		<Modal.Body>
			<div className="modal-heading">
				<h1 className="modal-heading-title">Sorry... Time’s up!</h1>
				<p>The time limit gives all fans a fair shot at tickets.</p>
			</div>
			<Button onClick={handleClose}>Try again</Button>
		</Modal.Body>
	);
}
