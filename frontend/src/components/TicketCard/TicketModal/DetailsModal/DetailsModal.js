import React, { Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export default function DetailsModal() {
	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h4">Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="modal-body-header pb-2">
					<h4 className="modal-heading-title mb-2">Nic Fancuilli</h4>
					<p>Sun May 1, 2022 8 PM</p>
				</div>
				<ListGroup as="ul" variant="flush">
					<ListGroup.Item as="li" className="list">
						<p className="heading">Entry Info</p>
						<p>Floor</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Seat Location</p>
						<p>GA</p>
					</ListGroup.Item>

					<ListGroup.Item as="li" className="list">
						<p className="heading">Ticket Info</p>
						<p>Live Nation Presents</p>
						<p>Bill Maher MGM National Harbor</p>
						<p>Doors Open at 7:00 PM</p>
						<p>Sun May 01 2022 8:00 PM</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Barcode Number</p>
						<p>6708570159387676</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Location</p>
						<p>The Theater at MGM National Harbor National Harbor MD US</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Order Number</p>
						<p>51-22116/WDC</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Purchase Date</p>
						<p>Wed, Sep 15 2021 - 8:28AM</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Contact Address</p>
						<p className="text-secondary">Oxa7d8…..d270</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Token ID</p>
						<p className="text-secondary">23000121</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Token Standard</p>
						<p className="text-secondary">ERC - 721</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Blockchain</p>
						<p className="text-secondary">Ethereum</p>
					</ListGroup.Item>
				</ListGroup>
			</Modal.Body>
		</Fragment>
	);
}
