import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function TimeoutModal() {
	const navigate = useNavigate();

	return (
		<Modal.Body>
			<h1 className="modal-body-heading-title">Sorry... Time’s up!</h1>
			<p>The time limit gives all fans a fair shot at tickets.</p>
			<Stack className="btn-group-flex">
				<Button size="lg" onClick={() => navigate(-1)}>
					Try again
				</Button>
			</Stack>
		</Modal.Body>
	);
}
