import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function LeaveModal({ handleClose }) {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<h1 className="modal-body-heading-title">Are you sure you want to leave checkout?</h1>
			<p>If you leave this page, you'll lose your chance to purchase these tickets.</p>
			<Stack className="btn-group-flex">
				<Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>
					Cancel order
				</Button>
				<Button variant="primary" size="lg" onClick={handleClose}>
					Continue with checkout
				</Button>
			</Stack>
		</Modal.Body>
	);
}
