import React, { Fragment, useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';

 
import { BackButton } from '../../../BackButton';
import { SuccessContainer } from '../SuccessContainer';

import { formatNumber } from '../../../../utilities/helpers';

import { SuccessDisclaimer } from '../SuccessDisclaimer';

import './sellModal.scss';

export default function SellModal({ handleShow, setTicketStatus }) {
	// text
	// const type = ticketStatus === 'sell' ? 'sell' : 'delist';

	const [
		step,
		setStep
	] = useState('sell');

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

	const handleChange = (val) =>
		setValue((prevState) => [
			...prevState,
			val
		]);

	const handleClick = () => {
		handleShow(); 
		if (step === 'successful') setTicketStatus('listed')
	};

	const handleUpdatePrice = () => {
		setStep('summary');
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
			<Card.Header className="heading--flex">
				<Card.Title as="h5">Sell</Card.Title>
				<Button variant="close" onClick={handleShow} />
			</Card.Header>
			<Card.Body>
			{step === 'sell' && (
				<>
					<h6 className="card-heading">Select tickets to sell</h6>
					<Stack direction="horizontal" className="pt-2 split-row">
						<div>
							<span className="fw-medium">General Admission</span>
						</div>
						<div>
							<span className="num-tickets">4 Tickets</span>
						</div>
					</Stack>
					<Form className="d-flex gap-4 pt-4">
						<ToggleButtonGroup type="checkbox" onChange={handleChange}>
							<ToggleButton variant="light" id="tbg-btn-1" value={1}>
								GA
							</ToggleButton>
							<ToggleButton variant="light" id="tbg-btn-2" value={2}>
								GA
							</ToggleButton>
							<ToggleButton variant="light"  id="tbg-btn-3" value={3}>
								GA
							</ToggleButton>
						</ToggleButtonGroup>
					</Form>
					<Button onClick={() => setStep('price')} className="icon-button btn-next" size="lg">
						Set price
					</Button>
				</>
			)}

			{step === 'price' && (
				<>
						<h4>Price your tickets</h4>
						<p className="small text-muted fw-medium">
							Ticket face value $174.00
						</p>
						<Badge bg="light" className="bold mt-4 text-dark badge-xl">$0</Badge>
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
						<Stack direction="horizontal" gap={3}  className="btn-group-flex">
							<BackButton />
							<Button onClick={() => setStep('summary')} className="icon-button btn-next" size="lg">Payout summary</Button>
						</Stack>
				</>
			)}
			{step === 'summary' && (
				<>
					<div className="card-body-header">
						<h4 className="card-heading">Payment Summary</h4>
						<p>
							Please go to 'Settings' in your 'Wallet' and link your bank account to receive funds from ticket sales. 
						</p>
					</div>
						
							<div className='pt-4'>
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
							
							<div className="mt-auto">
								<small className="disclaimer mb-3">By clicking 'Agree and sell' you are constenting to Blocktickets <a href="">terms and conditions</a>. </small>
								<Stack direction="horizontal" gap={3}className="mt-0 btn-group-flex">
									<BackButton />
									<Button onClick={() => setStep('successful')} size="lg">Agree and sell</Button></Stack></div>
						
					
				</>
			)}
			{step === 'successful' && (
				<>
					<SuccessContainer>
						<h4 className="card-heading">
							Your tickets are listed for sale!
						</h4>
					</SuccessContainer>
					<p className="small">
							We will notify you via sms if a purchase is made. While your tickets are listed, you can change the price or delist them from the marketplace in 'My listings' at anytime	
					</p>
					<SuccessDisclaimer />
					<Button onClick={handleClick} size='lg'>Close</Button>
					</>
				
			)}</Card.Body>
		</Fragment>
	);
}
