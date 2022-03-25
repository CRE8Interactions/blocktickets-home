import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './totalCard.scss';

export default function TotalCard() {
	const [
		expanded,
		setExpanded
	] = useState(false);

	return (
		<Card className={`card--popup ${expanded && 'card--popup-expanded'}`}>
			<Card.Header className="heading--flex">
				<Card.Title as="h5" className="normal">
					Total
				</Card.Title>
				<Stack direction="horizontal" className="card-header-price">
					<span className="fw-bold fs-md">$279.00</span>
					<Button
						onClick={() => setExpanded(!expanded)}
						variant="outline-light"
						className=" btn--icon-lg"
					/>
				</Stack>
			</Card.Header>
			{expanded && (
				<Card.Body>
					<ul>
						<li>
							<Row>
								<Col>
									<span className="fw-bold mb-2">Tickets</span>
									<ul>
										<li>Tickes: $35.00 x 2</li>
									</ul>
								</Col>

								<Col className="text-end align-self-end">
									<span>$70.00</span>
								</Col>
							</Row>
						</li>
						<li>
							<Row>
								<Col>
									<span className="fw-bold">Tickets</span>
									<ul>
										<li>Tickes: $35.00 x 2</li>
									</ul>
								</Col>

								<Col className="text-end align-self-end">
									<span>$70.00</span>
								</Col>
							</Row>
						</li>
					</ul>
				</Card.Body>
			)}
			<Card.Footer>
				<small className="tablet-desktop-only caption">
					By clicking "Complete Purchase", you agree that you have read, understand and
					agree to be bound by Blocktickets' <a href="">Terms of Use</a>
				</small>
				<Button variant="primary" size="lg">
					Complete Purchase
				</Button>
			</Card.Footer>
		</Card>
	);
}
