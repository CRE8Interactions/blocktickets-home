import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function CardDeclineModal({ modalError }) {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<div className="modal-body-heading">
				<h1 className="modal-body-heading-title">{modalError}</h1>
				<p>Please check your card details and try again.</p>
			</div>
			<Stack className="btn-group-flex">
				<Button onClick={() => navigate(-1)}>Try Again</Button>
			</Stack>
		</Modal.Body>
	);
}
