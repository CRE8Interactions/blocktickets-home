import React, { Fragment, useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { PriceSlider } from './PriceSlider';
import { AddTicket } from './AddTicket';
import { SuccessContainer } from './../SuccessContainer';

import { formatNumber } from '../../../../utilities/helper';

import './sellModal.scss';

export default function SellModal({ ticketStatus, setTicketStatus }) {
	const [
		step,
		setStep
	] = useState('sell');

	// for price range
	const [
		sliderValue,
		setSliderValue
	] = useState(formatNumber(20));

	// counter to conditionally add ticket
	const [
		addTickets,
		setAddTickets
	] = useState(0);

	// all tickets - for demo purposes, will come from database
	const tickets = [
		'Nicfanciulli#9358',
		'Another#1234',
		'Nicfanciulli#9358',
		'Another#4321'
	];

	// object to collect the tickets selected - used to send to database
	const [
		selectedTickets,
		setSelectedTickets
	] = useState({ 1: 'Nicfanciulli#9358' });

	const handleClick = () => {
		setAddTickets(addTickets + 1);
	};

	const handleSell = () => {
		setStep('successful');
		setTicketStatus('sale');
	};
	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h4">Sell ticket</Modal.Title>
			</Modal.Header>
			{step === 'sell' && (
				<Fragment>
					<div className="fixed-heading modal-heading">
						<h4 className="modal-heading-title">List your ticket on our marketplace</h4>
						<p className="small">
							Set your ticket price below. You can change your price or delist your
							ticket from our marketplace at anytime.
						</p>
					</div>
					<Modal.Body>
						<Form>
							<Form.Group controlId="range" className="form-group">
								<Form.Label>Sellable Range</Form.Label>
								<PriceSlider
									sliderValue={sliderValue}
									setSliderValue={setSliderValue}
								/>
							</Form.Group>

							<Form.Group controlId="price" className="form-group">
								<Form.Label>Price Per Ticket</Form.Label>
								<Form.Control
									id="price"
									min={sliderValue}
									max={'999'}
									type="text"
									value={`$${sliderValue}`}
									onChange={(e) => setSliderValue(e.target.value.slice(1))}
								/>
							</Form.Group>
							<Form.Group controlId="ticket" className="form-group">
								<Row className="split-row">
									<Col>
										<Form.Label className="selected-label">
											Selected ticket
										</Form.Label>
									</Col>
									<Col>
										<Form.Control disabled value="Nicfanciulli#9358" />
									</Col>
								</Row>
							</Form.Group>
							{[
								...Array(addTickets)
							].map((_, index) => (
								<AddTicket
									key={index}
									tickets={tickets}
									selectedTickets={selectedTickets}
									setSelectedTickets={setSelectedTickets}
								/>
							))}
							<Button
								onClick={handleClick}
								variant="outline-light"
								size="lg"
								disabled={
									[
										...new Set(tickets)
									].length === Object.keys(selectedTickets).length
								}
								className="icon-button btn-add">
								Add ticket
							</Button>
							<Button
								onClick={() => setStep('summary')}
								variant="primary"
								size="lg"
								className="icon-button btn-next">
								Next
							</Button>
						</Form>
					</Modal.Body>
				</Fragment>
			)}

			{step === 'summary' && (
				<Fragment>
					<div className="fixed-heading modal-heading">
						<h4 className="modal-heading-title">Summary</h4>
						<p>
							You are agreeing to Blocktickets seller terms and conditions by clicking
							'Agree and sell'. If you have any question please reach out to{' '}
							<a href="">help@blocktickets.xyz</a>
						</p>
					</div>
					<Modal.Body>
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
												<span>($7.00)</span>
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
						<Button variant="primary" size="lg" onClick={handleSell}>
							Agree and sell
						</Button>
					</Modal.Body>
				</Fragment>
			)}
			{step === 'successful' && (
				<Modal.Body>
					<SuccessContainer>
						<h4 className="m-0 modal-heading-title">Your tickets are listed!</h4>
					</SuccessContainer>
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
