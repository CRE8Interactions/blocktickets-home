import React, { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

export default function DetailsModal() {
	return (
		<Fragment>
			<Modal.Header closeButton>
				<div>
					<Modal.Title as="h4">NFT Details</Modal.Title>
					<p className="ticket-code">nicfanciulli #9358</p>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="modal-heading">
					<h4 className="normal mb-2">Description</h4>
					<p className="small text-muted">Grants you access to the event</p>
				</div>
				<Row className="split-row">
					<Col>
						<span>Contact Address</span>
					</Col>
					<Col className="text-end">
						<span className="text-secondary">Oxa7d8…..d270</span>
					</Col>
				</Row>
				<Row className="split-row">
					<Col>
						<span>Token ID</span>
					</Col>
					<Col className="text-end">
						<span className="text-secondary">23000121</span>
					</Col>
				</Row>
				<Row className="split-row">
					<Col>
						<span>Token Standard</span>
					</Col>
					<Col className="text-end">
						<span>ERC - 721</span>
					</Col>
				</Row>
				<Row className="split-row">
					<Col>
						<span>Blockchain</span>
					</Col>
					<Col className="text-end">
						<span>Ethereum</span>
					</Col>
				</Row>
			</Modal.Body>
		</Fragment>
	);
}
