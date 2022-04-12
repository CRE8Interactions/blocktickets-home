import React, { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { PriceRangeSlider } from './../../../PurchaseTickets/TicketPurchase/SeatSelection/PriceRangeSlider';
import { AddTicket } from './AddTicket';

import './sellModal.scss';

export default function SellModal() {
	const [
		status,
		setStatus
	] = useState('sell');

	const [
		sliderValues,
		setSliderValues
	] = useState([
		20,
		50
	]);

	const [
		tickets,
		setTickets
	] = useState(1);

	const [
		addTicket,
		setAddTicket
	] = useState(false);

	const [
		numTickets,
		setNumTickets
	] = useState(0);

	const [
		selectedTickets,
		setSelectedTickets
	] = useState('Nicfanciulli#93...');

	const handleClick = () => {
		setNumTickets(numTickets + 1);
	};
	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h4">Sell ticket</Modal.Title>
			</Modal.Header>
			{status === 'sell' && (
				<Fragment>
					<div className="scrollable-body modal-heading px-4 pb-3">
						<h4 className="modal-heading-title">List your ticket on our marketplace</h4>
						<p className="small">
							Set your ticket price below. You can change your price or delist your
							ticket from our marketplace at anytime.
						</p>
					</div>
					<Modal.Body>
						<Form>
							<Form.Group controlId="range">
								<Form.Label>Range</Form.Label>
								<PriceRangeSlider
									sliderValues={sliderValues}
									setSliderValues={setSliderValues}
								/>
							</Form.Group>

							<Form.Group controlId="price" className="form-group">
								<Form.Label>Price</Form.Label>
								<Form.Control
									id="price"
									type="text"
									value={`$${sliderValues[0]}`}
								/>
							</Form.Group>
							<Form.Group controlId="ticket" className="form-group">
								<Row className="split-row">
									<Col>
										<Form.Label>Selected ticket</Form.Label>
									</Col>
									<Col>
										<Form.Select readOnly defaultValue={selectedTickets}>
											<option>Nicfanciulli...</option>
										</Form.Select>
									</Col>
								</Row>
							</Form.Group>
							{[
								...Array(numTickets)
							].map(() => <AddTicket />)}
							<Button
								onClick={handleClick}
								variant="outline-light"
								size="lg"
								className="icon-button btn-add">
								Add another ticket
							</Button>
							<Button
								onClick={() => setStatus('summary')}
								variant="primary"
								size="lg"
								className="icon-button btn-next">
								Next
							</Button>
						</Form>
					</Modal.Body>
				</Fragment>
			)}

			{status === 'summary' && (
				<Modal.Body>
					<div className="modal-heading">
						<h4 className="modal-heading-title">Summary</h4>
						<p>
							You are agreeing to Blocktickets seller terms and conditions by clicking
							'Agree and sell'. If you have any question please reach out to{' '}
							<a href="">help@blocktickets.xyz</a>
						</p>
					</div>
					<h2 className="normal text-uppercase text-muted mb-3">Ticket Breakdown</h2>
					<ul>
						<li className="list">
							<p className="heading">Tickets</p>
							<ul>
								<li>
									<Row className="split-row">
										<Col>
											<span>Tickets: $35.00 x 2</span>
										</Col>

										<Col className="text-end ">
											<span>$70.00</span>
										</Col>
									</Row>
								</li>
							</ul>
						</li>
						<li className="list">
							<p className="heading">Royalities</p>
							<ul>
								<li>
									<Row className="split-row">
										<Col>
											<span>Royalities: 10%</span>
										</Col>
										<Col className="text-end ">
											<span>$7.00</span>
										</Col>
									</Row>
								</li>
							</ul>
						</li>
						<li className="list">
							<Row className="split-row">
								<Col>
									<span className="heading m-0">Your Payout</span>
								</Col>
								<Col className="text-end ">
									<span className="fw-medium">$63.00</span>
								</Col>
							</Row>
						</li>
					</ul>
					<Button variant="primary" size="lg" onClick={() => setStatus('successful')}>
						Agree and sell
					</Button>
				</Modal.Body>
			)}
			{status === 'successful' && (
				<Modal.Body>
					<div
						id="success"
						className="modal-heading d-flex-column justify-content-center align-items-center gap-4">
						<h4 className="m-0 modal-heading-title">Your tickets are listed!</h4>
					</div>
					<p className="small">
						We will notify you via sms if a purchase is made. During the auction time,
						you can change the status of your order by delisting it from the
						marketplace.
					</p>
				</Modal.Body>
			)}
		</Fragment>
	);
}
