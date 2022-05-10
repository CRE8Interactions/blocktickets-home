import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

 
import { BackButton } from '../../../BackButton';
import { SelectTickets } from '../SelectTickets';
import { SuccessContainer } from '../SuccessContainer';

import { formatNumber } from '../../../../utilities/helpers';

import { SuccessDisclaimer } from '../SuccessDisclaimer';

import './sellModal.scss';

export default function SellModal({ handleClose, setTicketStatus }) {
	// text
	// const type = ticketStatus === 'sell' ? 'sell' : 'delist';

	// 1 - sell 
	// 2 - price 
	// 3 - summary 
	// 4 - success 
	const [
		step,
		setStep
	] = useState(1);

	const [
		updateSuccessful,
		setUpdateSuccessful
	] = useState(false);

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

	const [
		value,
		setValue
	] = useState([]);

	const handleGoBack = () => {
		setStep(step - 1)
	}
	const handleChange = (val) =>
		setValue((prevState) => [
			...prevState,
			val
		]);

	const handleClick = () => {
		handleClose(); 
		if (step === 4) setTicketStatus('listed')
	};

	const handleUpdatePrice = () => {
		setStep(3);
		setUpdateSuccessful(true);
	};

	useEffect(
		() => {
			// ticket status changes when component unmounts and step is successful
			return () => {
				// if (step === 'successful') {
				// 	const status = ticketStatus === 'sell' ? 'sale' : 'sell';
				// 	setTicketStatus(status);
				// }
			};
		},
		[
			step
		]
	);

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h5">Sell</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{step === 1 && (
				<>
					<SelectTickets status="sell" />
					<Stack direction="horizontal" className="btn-group-flex">
						<Button onClick={() => setStep(2)} className="icon-button btn-next" size="lg">
							Set price
						</Button>
					</Stack>
					</>
			)}

			{step === 2 && (
				<>
						<div className="modal-heading">
							<h4 className="modal-heading-title mb-2">Price your tickets</h4>
							<p className="small text-muted fw-medium">
								Ticket face value $174.00
							</p>
						</div>
						<Badge bg="default" className="d-flex-column gap-2 badge-xl badge--light bold text-dark ">$0 <span className='caption fw-normal text-muted badge-label'>Price per ticket</span></Badge>
						<div id="numpad">
							<Row className="split-row">
								<Col>
									<span>1</span>
									</Col>
									<Col><span>2</span></Col>
									<Col>
									<span>3</span>
								</Col>
								</Row>
							
								<Row className="split-row">
								<Col>
									<span>4</span>
									</Col>
									<Col><span>5</span></Col>
									<Col>
									<span>6</span>
								</Col>
								</Row>
								<Row className="split-row">
								<Col>
									<span>7</span>
									</Col>
									<Col><span>8</span></Col>
									<Col>
									<span>9</span>
								</Col>
								</Row>
								<Row className="split-row">
								<Col>
									<span>.</span>
									</Col>
									<Col><span>0</span></Col>
									<Col>
									<span>&larr;</span>
								</Col>
								</Row>
						</div>
						<Stack direction="horizontal"  className="btn-group-flex">
							<BackButton variant="default" handleGoBack={handleGoBack} />
							<Button onClick={() => setStep(3)} className="icon-button btn-next" size="lg">Payout summary</Button>
						</Stack>
				</>
			)}
			{step === 3 && (
				<>
					<div className="modal-body-header modal-heading">
						<h4 className="modal-heading-title mb-2">Payment Summary</h4>
						<p>
							Please go to 'Settings' in your 'Wallet' and link your bank account to receive funds from ticket sales. 
						</p>
					</div>
						
							<div>
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
										<p className="heading">Service Fees</p>
										<ul>
											<li>
				     								<Row className="split-row">
													<Col>
														<span>Service Fees: 7.00 x 2</span>
													</Col>
													<Col className="text-end ">
														<span>($14.00)</span>
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
							</div>
							
							<div className="mt-auto mt-md-4">
								<small className="disclaimer mb-3">By clicking 'Agree and sell' you are constenting to Blocktickets <a href="">terms and conditions</a>. </small>
								<Stack direction="horizontal" className="mt-0 btn-group-flex">
									<BackButton variant="default" handleGoBack={handleGoBack} />
									<Button onClick={() => setStep(4)} size="lg">Agree and sell</Button></Stack></div>
						
					
				</>
			)}
			{step === 4 && (
				<>
					<SuccessContainer>
						<h4 className="modal-heading-title">
							Your tickets are listed for sale!
						</h4>
					</SuccessContainer>
					<p className="small">
							We will notify you via sms if a purchase is made. While your tickets are listed, you can change the price or delist them from the marketplace in 'My listings' at anytime	
					</p>
					<SuccessDisclaimer />
					<Stack className="btn-group-flex">
						<Link to="" className="btn btn-lg btn-outline-light">Go to My listings</Link>
						<Button onClick={handleClick} size='lg'>Close</Button>
						</Stack>
					</>
				
			)}</Modal.Body>
		</Fragment>
	);
}
