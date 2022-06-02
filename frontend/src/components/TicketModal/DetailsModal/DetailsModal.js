import React, { Fragment } from 'react';
import moment from 'moment';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export default function DetailsModal({ order }) {
	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h4">Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="modal-body-heading--with-border pb-2 mb-0">
					<h4 className="modal-body-heading-title mb-2">{order?.event?.name}</h4>
					<p>{moment(order?.event?.start).format('ddd MMM D, YYYY h A')}</p>
				</div>
				<ListGroup as="ul" variant="flush">
					<ListGroup.Item as="li" className="list">
						<p className="heading">Entry Info</p>
						<p>GA</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Seat Location</p>
						<p>GA</p>
					</ListGroup.Item>

					<ListGroup.Item as="li" className="list">
						<p className="heading">Ticket Info</p>
						{ order?.event?.presentedBy &&
							<p>{order?.event?.presentedBy}</p>
						}
						<p>{order?.event?.name}</p>
						<p>Doors Open at {moment(order?.event?.doorsOpen).format('h:mm A')}</p>
						<p>{moment(order?.event?.start).format('ddd MMM D YYYY h:mm A')}</p>
					</ListGroup.Item>
					{/* <ListGroup.Item as="li" className="list">
						<p className="heading">Barcode Number</p>
						<p>6708570159387676</p>
					</ListGroup.Item> */}
					<ListGroup.Item as="li" className="list">
						<p className="heading">Location</p>
						<p>{order?.event?.venue?.name} {order?.event?.venue?.address[0]?.city} {order?.event?.venue?.address[0]?.state} {order?.event?.venue?.address[0]?.country}</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Order Number</p>
						<p>{order?.orderId}</p>
					</ListGroup.Item>
					<ListGroup.Item as="li" className="list">
						<p className="heading">Purchase Date</p>
						<p>{moment(order?.event?.createdAt).format('ddd, MMM D YYYY - h:mmA')}</p>
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
