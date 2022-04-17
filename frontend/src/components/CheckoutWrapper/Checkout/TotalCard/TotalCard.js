import React, { Fragment, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { Spinner } from '../../../SpinnerContainer/Spinner';

import './totalCard.scss';

export default function TotalCard({ setStatus, addOns }) {
	const [
		expanded,
		setExpanded
	] = useState(false);

	const [
		purchasing,
		setPurchasing
	] = useState(false);

	let tickets = sessionStorage.getItem('cart')
	if (tickets) tickets = JSON.parse(tickets)

	return (
		<Card className={`card-lg card--popup ${expanded && 'card--popup-expanded'}`}>
			<Card.Header className="heading--flex">
				<Card.Title as="h5" className="normal">
					Total
				</Card.Title>
				<Stack direction="horizontal" className="card-header-price">
					<span className="fw-bold fs-md">${(parseFloat(tickets.ticket.attributes.cost + tickets.ticket.attributes.fee + tickets.ticket.attributes.facilityFee).toFixed(2) * tickets.ticketCount + 2.50 + 4.35).toFixed(2)}</span>
					<Button
						onClick={() => setExpanded(!expanded)}
						variant="outline-light"
						className=" btn--icon-sm">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
								fill="#777E91"
							/>
						</svg>
					</Button>
				</Stack>
			</Card.Header>
			{expanded && (
				<Card.Body>
					<ul>
						<li className="list">
							<p className="heading">Tickets</p>
							<ul>
								<li>
									<Row className="split-row">
										<Col>
											<span>Tickets: ${parseFloat(tickets.ticket.attributes.cost).toFixed(2)} x {tickets.ticketCount}</span>
										</Col>

										<Col className="text-end ">
											<span>${parseFloat(tickets.ticket.attributes.cost).toFixed(2) * tickets.ticketCount}</span>
										</Col>
									</Row>
								</li>
							</ul>
						</li>
						<li className="list">
							<p className="heading">Fees</p>
							<ul>
								<li>
									<Row className="split-row">
										<Col>
											<span>Service Fee: ${parseFloat(tickets.ticket.attributes.fee).toFixed(2)} x {tickets.ticketCount}</span>
										</Col>
										<Col className="text-end ">
											<span>${(parseFloat(tickets.ticket.attributes.fee).toFixed(2) * tickets.ticketCount).toFixed(2)}</span>
										</Col>
									</Row>
								</li>
								<li className="list">
									<Row className="split-row">
										<Col>
											<span>Facility Charge: ${parseFloat(tickets.ticket.attributes.facilityFee).toFixed(2)} x {tickets.ticketCount}</span>
										</Col>
										<Col className="text-end ">
											<span>${(parseFloat(tickets.ticket.attributes.facilityFee).toFixed(2) * tickets.ticketCount).toFixed(2)}</span>
										</Col>
									</Row>
								</li>
								<li>
									<Row className="split-row">
										<Col>
											<span>Order Processing Fee</span>
										</Col>
										<Col className="text-end 
										">
											<span>$4.35</span>
										</Col>
									</Row>
								</li>
							</ul>
						</li>

						{addOns.length > 0 && (
							<li className="list">
								<p className="heading">Add on</p>
								<ul>
									<li>
										<Row className="split-row">
											<Col>
												<span>Meet &amp; Greet</span>
											</Col>
											<Col className="text-end">
												<span>$45.00</span>
											</Col>
										</Row>
									</li>
									<li>
										<Row className="split-row">
											<Col>
												<span>Merch</span>
											</Col>
											<Col className="text-end">
												<span>$45.00</span>
											</Col>
										</Row>
									</li>
									<li>
										<Row className="split-row">
											<Col>
												<span>Parking Pass</span>
											</Col>
											<Col className="text-end ">
												<span>$12.00</span>
											</Col>
										</Row>
									</li>
								</ul>
							</li>
						)}

						<li className="list">
							<ul>
								<li>
									<Row className="split-row">
										<Col>
											<span className="heading m-0">Tax</span>
										</Col>
										<Col className="text-end ">
											<span>$2.50</span>
										</Col>
									</Row>
								</li>
							</ul>
						</li>
					</ul>
				</Card.Body>
			)}
			<Card.Footer className={`d-flex-column ${expanded && 'with-border'}`}>
				<small className="caption">
					By clicking "Complete Purchase", you agree that you have read, understand and
					agree to be bound by Blocktickets' <a href="">Terms of Use</a>
				</small>
				<div id="payment-request-button">
					<Button
						variant="primary"
						size="lg"
						className="icon-button w-100"
						onClick={() => setStatus('successful')}>
						{purchasing ? (
							<Fragment>
								<Spinner color={'#fcfcfd'} size="sm" />
								<span>Purchasing...</span>
							</Fragment>
						) : (
							<span>Complete Purchase</span>
						)}
					</Button>
				</div>
			</Card.Footer>
		</Card>
	);
}
