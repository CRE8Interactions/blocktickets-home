import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './orderSummary.scss';


export default function OrderSummary(order) {
	return (
		<ListGroup as="ul" variant="flush" id="order">
			<ListGroup.Item as="li" className="list">
				<Row className="split-row">
					<Col>
						<span>Payment</span>
					</Col>

					<Col className="text-end ">
						<span />
					</Col>
				</Row>
			</ListGroup.Item>
			<ListGroup.Item as="li" className="list">
				<ul>
					<li>
						<Row className="split-row">
							<Col>
								<span>Subtotal</span>
							</Col>
							<Col className="text-end">
								<span>${order.total}</span>
							</Col>
						</Row>
					</li>

					<li>
						{' '}
						<Row className="split-row">
							<Col>
								<span>Tax</span>
							</Col>
							<Col className="text-end ">
								<span>$24.00</span>
							</Col>
						</Row>
					</li>
					<li>
						<Row className="split-row">
							<Col>
								<span>Shipment</span>
							</Col>
							<Col className="text-end
											">
								<span>$4.35</span>
							</Col>
						</Row>
					</li>
					<li>
						<Row className="split-row">
							<Col>
								<span>Total</span>
							</Col>
							<Col className="text-end
											">
								<span>$4.35</span>
							</Col>
						</Row>
					</li>
				</ul>
			</ListGroup.Item>
		</ListGroup>
	);
}
