import React, { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Error } from './../../../Error';

import './transferModal.scss';

export default function TransferModal() {
	const [
		status,
		setStatus
	] = useState('transfer');

	return (
		<Fragment>
			<Modal.Header closeButton>
				<div>
					<Modal.Title as="h4">Transfer ticket</Modal.Title>
					<p className="ticket-code">nicfanciulli#9358</p>
				</div>
			</Modal.Header>
			<Modal.Body>
				{status === 'successful' ? (
					<Fragment>
						<div
							id="success"
							className="modal-heading d-flex-column justify-content-center align-items-center gap-4">
							<h4 className="modal-heading-title">Transfer completed!</h4>
						</div>
						<p className="small text-muted">
							We have transferred your ticket to the recipient. If they have not
							received it please reach out to us.
						</p>
					</Fragment>
				) : (
					<Fragment>
						<div className="modal-heading">
							<h4 className="modal-heading-title">
								Enter the recepient phone number{' '}
							</h4>
							<p className="small text-muted">
								The recipient will get notified via text that you have transferred
								your ticket to them.
							</p>
						</div>
						<Form>
							<Form.Group controlId="phone-number">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control type="tel" placeholder="(416) 232 3423" />
							</Form.Group>
							<Form.Control.Feedback type="invalid">
								<Error />
							</Form.Control.Feedback>
							<Button
								onClick={() => setStatus('successful')}
								variant="primary"
								size="lg">
								Transfer
							</Button>
						</Form>
					</Fragment>
				)}
			</Modal.Body>
		</Fragment>
	);
}
