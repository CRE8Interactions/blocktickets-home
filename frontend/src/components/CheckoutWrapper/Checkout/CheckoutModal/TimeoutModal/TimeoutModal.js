import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TimeoutModal() {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<div className="modal-heading">
				<h1 className="modal-heading-title">Sorry... Time’s up!</h1>
				<p>The time limit gives all fans a fair shot at tickets.</p>
			</div>
			<Button onClick={() => navigate(-1)}>Try again</Button>
		</Modal.Body>
	);
}
