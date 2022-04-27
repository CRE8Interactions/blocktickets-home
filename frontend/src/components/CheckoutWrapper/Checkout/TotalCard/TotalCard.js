import React, { Fragment, useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { Spinner } from '../../../SpinnerContainer/Spinner';
import { cartTotal } from '../../../../utilities/helpers';
import { createOrder } from '../../../../utilities/api';
import CardDeclinedModal from '../CheckoutModal/CardDeclinedModal/CardDeclinedModel';

import './totalCard.scss';

export default function TotalCard({ setStatus, addOns, setOrder, intentId, paymentDeclined }) {
	const [
		expanded,
		setExpanded
	] = useState(false);

	const [
		purchasing,
		setPurchasing
	] = useState(false);

	let tickets = sessionStorage.getItem('cart');
	if (tickets) tickets = JSON.parse(tickets);

	const stripe = useStripe();
	const elements = useElements();

	const completePurchase = () => {
		setPurchasing(true);
		let data = {
			cart: tickets,
			paymentIntentId: intentId
		};

		createOrder(data)
			.then((res) => {
				// Need better way to store order data
				sessionStorage.setItem('order', JSON.stringify(res.data));
				sendPayment();
			})
			.catch((err) => console.error(err));
	};

	const sendPayment = async () => {
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const { error } = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: ''
			},
			redirect: 'if_required'
		});

		if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			setPurchasing(false)
			paymentDeclined(error.message)
			console.warn(error.message);
		}
		else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
			setStatus('successful');
		}
	};

	return (
		<Card className={`card-xl card--popup ${expanded && 'card--popup-expanded'}`}>
			<Card.Header className="heading--flex">
				<Card.Title as="h5" className="normal">
					Total
				</Card.Title>
				<Stack direction="horizontal" className="card-header-price">
					<span className="fw-bold fs-md">${cartTotal(tickets, 4.35, 2.5)}</span>
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
											<span>
												Tickets: ${parseFloat(tickets.ticket.attributes.cost).toFixed(2)}{' '}
												x {tickets.ticketCount}
											</span>
										</Col>

										<Col className="text-end ">
											<span>
												${parseFloat(
													tickets.ticket.attributes.cost
												).toFixed(2) * tickets.ticketCount}
											</span>
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
											<span>
												Service Fee: ${parseFloat(tickets.ticket.attributes.fee).toFixed(2)}{' '}
												x {tickets.ticketCount}
											</span>
										</Col>
										<Col className="text-end ">
											<span>
												${(parseFloat(
													tickets.ticket.attributes.fee
												).toFixed(2) * tickets.ticketCount).toFixed(2)}
											</span>
										</Col>
									</Row>
								</li>
								<li className="list">
									<Row className="split-row">
										<Col>
											<span>
												Facility Charge: ${parseFloat(tickets.ticket.attributes.facilityFee).toFixed(2)}{' '}
												x {tickets.ticketCount}
											</span>
										</Col>
										<Col className="text-end ">
											<span>
												${(parseFloat(
													tickets.ticket.attributes.facilityFee
												).toFixed(2) * tickets.ticketCount).toFixed(2)}
											</span>
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
					{/* Need to rethink how payment element and totalCard manage state */}
					<Button
						id="payment-btn"
						variant="primary"
						size="lg"
						className="icon-button w-100 d-none"
						onClick={(e) => completePurchase()}>
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

				<div id="payment-request-button">
					{/* Need to rethink how payment element and totalCard manage state */}
					<Button
						id="payment-btn-disabled"
						disabled
						variant="primary"
						size="lg"
						className="icon-button w-100">
						<span>Complete Purchase</span>
					</Button>
				</div>
			</Card.Footer>
		</Card>
	);
}
