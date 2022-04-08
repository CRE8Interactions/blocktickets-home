import React, { Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function TransferModal() {
	return (
		<Fragment>
			<Modal.Header closeButton>
				<div>
					<Modal.Title as="h4">Transfer ticket</Modal.Title>
					<p className="ticket-code">nicfanciulli#9358</p>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="modal-heading">
					<h4 className="modal-heading-title">Enter the recepient phone number </h4>
					<p className="small text-muted">
						The recipient will get notified via text that you have transferred your
						ticket to them.
					</p>
				</div>
				<Form>
					<Form.Group controlId="phone-number">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control type="text" placeholder="(416) 232 3423" />
						<Button variant="primary" size="lg" type="submit">
							Transfer
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Fragment>
	);
}
