import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CardDeclinedModal({ handleClose }) {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<div className="modal-heading">
				<h1 className="modal-heading-title">Your card was declined.</h1>
				<p>Please check your card details and try again.</p>
			</div>
			<Button variant="outline-light" onClick={() => navigate(-1)}>
				Continue
			</Button>
		</Modal.Body>
	);
}