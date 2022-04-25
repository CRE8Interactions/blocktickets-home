import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function LeaveModal({ handleClose }) {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<div className="modal-heading">
				<h1 className="modal-heading-title">Are you sure you want to leave checkout?</h1>
				<p>If you leave this page, you'll lose your chance to purchase these tickets.</p>
			</div>
			<Button variant="outline-light" onClick={() => navigate(-1)}>
				Cancel order
			</Button>
			<Button variant="primary" onClick={handleClose}>
				Continue with checkout
			</Button>
		</Modal.Body>
	);
}
