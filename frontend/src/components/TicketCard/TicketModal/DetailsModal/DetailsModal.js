import React, { Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

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
						<ul>
							<Stack direction="horizontal" as="li" className="list split-row">
								<p>Contact Address</p>
								<span className="text-end text-secondary">Oxa7d8…..d270</span>
							</Stack>
							<Stack direction="horizontal" as="li" className="list split-row">
								<p>Token ID</p>
								<span className="text-end text-secondary">23000121</span>
							</Stack>
							<Stack direction="horizontal" as="li" className="list split-row">
								<p>Token Standard</p>
								<span className="text-end text-secondary">ERC - 721</span>
							</Stack>
							<Stack direction="horizontal" as="li" className="list split-row">
								<p>Blockchain</p>
								<span className="text-end text-secondary">Ethereum</span>
							</Stack>
						</ul>
					</ListGroup.Item>
				</ListGroup>
			</Modal.Body>
		</Fragment>
	);
}
