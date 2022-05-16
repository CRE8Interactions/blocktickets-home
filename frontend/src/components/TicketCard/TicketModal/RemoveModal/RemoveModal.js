import React, { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { DisplayTickets } from '../DisplayTickets';

export default function RemoveModal({ handleClose, removeListing, listing }) {
	// 1 - confirmation
	// 2 - success
	const [
		step,
		setStep
	] = useState(1);

	const remove = () => {
		removeListing(listing.id);
		setStep(2);
	};

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h5">Remove listing</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{step === 1 && (
					<Fragment>
						<div className="modal-heading">
							<h4 className="modal-heading-title">
								Are you sure you want to remove this listing?
							</h4>
							<DisplayTickets />
						</div>
						<Stack className="btn-group-flex">
							<Button
								onClick={remove}
								variant="outline-light"
								size="lg"
								className="text-danger">
								Remove
							</Button>
							<Button onClick={handleClose} size="lg">
								Cancel
							</Button>
						</Stack>
					</Fragment>
				)}
				{step === 2 && (
					<Fragment>
						<SuccessContainer>
							<h4 className="modal-heading-title">Your listing has been removed!</h4>
						</SuccessContainer>

						<p className="small">
							You can re-list them at anytime on the marketplace. Please go to 'My
							Events' to view your tickets.
						</p>
						<SuccessDisclaimer />
						<Stack direction="horizontal" className="btn-group-flex">
							<Button onClick={handleClose} size="lg">
								Close
							</Button>
						</Stack>
					</Fragment>
				)}
			</Modal.Body>
		</Fragment>
	);
}
