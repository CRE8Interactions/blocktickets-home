import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
 
import { BackButton } from '../../../BackButton';
import { DisplayTickets } from '../DisplayTickets';
import { SuccessContainer } from '../SuccessContainer';

import { SuccessDisclaimer } from '../SuccessDisclaimer';

import './sellModal.scss';

export default function SellModal({ handleClose, setTicketStatus, ticketAction }) {

	// 1 - sell 
	// 2 - price 
	// 3 - summary 
	// 4 - success 
	const [
		step,
		setStep
	] = useState(1);

	const [
		isUpdate,
		setIsUpdate
	] = useState(false);

	const [price, setPrice] = useState(0);

	// select tickets
	const [
		selectedTickets,
		setSelectedTickets
	] = useState([]);

	const handlePrice = (val) => {	
		setPrice(val)}
		

	const handleGoBack = () => {
		setStep(step - 1)
	}
	
	const handleClick = () => {
		handleClose(); 
		if (!isUpdate && step === 4) setTicketStatus('listed')
	};

	useEffect(() => {
	  if (ticketAction === 'edit') {
		  setIsUpdate(true)
		  setStep(2)
	  }
	}, [])
	

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h5"> { isUpdate ? 'Edit' : 'Sell' }</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{step === 1 && (
				<>
					<DisplayTickets status="sell" role="select" setSelectedTickets={setSelectedTickets} />
					<Stack direction="horizontal" className="btn-group-flex">
						<Button onClick={() => setStep(2)} disabled={selectedTickets.length === 0 }         className="btn-next" size="lg">
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
						<Form.Group controlId='price' className="form-card bg-info">
							<Form.Label>Price per ticket</Form.Label>
							<InputGroup className="input-group-lg">
								<InputGroup.Text>$</InputGroup.Text>
								<Form.Control
								  type="text" value={price} onChange={(e) => handlePrice(e.target.value)} required
								/>
							  </InputGroup>
						</Form.Group>
						<div id="numpad">
							<Row className="split-row">
								<Col>
									<Button value="1" variant="default" onClick={(e) => handlePrice(e.target.value)}>1</Button>
									</Col>
									<Col><Button value="2" variant="default" onClick={(e) => handlePrice(e.target.value)}>2</Button></Col>
									<Col>
									<Button value="3" variant="default" onClick={(e) => handlePrice(e.target.value)}>3</Button>
								</Col>
								</Row>
							
								<Row className="split-row">
								<Col>
								<Button value="4" variant="default" onClick={(e) => handlePrice(e.target.value)}>4</Button>
									</Col>
									<Col><Button value="5" variant="default" onClick={(e) => handlePrice(e.target.value)}>5</Button></Col>
									<Col>
									<Button value="6" variant="default" onClick={(e) => handlePrice(e.target.value)}>6</Button>
								</Col>
								</Row>
								<Row className="split-row">
								<Col>
									<Button value="7" variant="default" onClick={(e) => handlePrice(e.target.value)}>7</Button>
									</Col>
									<Col><Button value="8" variant="default" onClick={(e) => handlePrice(e.target.value)}>8</Button></Col>
									<Col>
									<Button value="9" variant="default" onClick={(e) => handlePrice(e.target.value)}>9</Button>
								</Col>
								</Row>
								<Row className="split-row">
								<Col>
									<Button value="." variant="default" onClick={(e) => handlePrice(e.target.value)}>.</Button>
									</Col>
									<Col><Button value="0" variant="default" onClick={(e) => handlePrice(e.target.value)}>0</Button></Col>
									<Col>
									<Button value="1" variant="default" onClick={(e) => handlePrice(e.target.value)}>&larr;</Button>
								</Col>
								</Row>
						</div>
						<Stack direction="horizontal"  className="btn-group-flex">
							<BackButton variant="default" handleGoBack={handleGoBack} />
							<Button onClick={() => setStep(3)} className="btn-next" disabled={price === 0} size="lg">Payout summary</Button>
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
											<Stack as="li" direction="horizontal" className="split-row">
														<span>Tickets: $35.00 x 2</span>
														<span className='text-end'>$70.00</span>
											</Stack>
										</ul>
									</li>
									<li className="list">
										<p className="heading">Service Fees</p>
										<ul>
											<Stack as="li" direction="horizontal" className="split-row">	<span>Service Fees: 7.00 x 2</span>
											<span className='text-end'>($14.00)</span>
													
											</Stack>
										</ul>
									</li>
									<Stack direction='horizontal' as="li" className="split-row list">
												<span className="heading m-0">Your Payout</span>
												<span className="text-end fw-medium">$63.00</span>
									</Stack>
								</ul>
							</div>
							
							<div className="mt-auto mt-md-4">
								<small className="disclaimer mb-3">By clicking 'Agree and sell' you are constenting to Blocktickets <a href="">terms and conditions</a>. </small>
								<Stack direction="horizontal" className="mt-0 btn-group-flex">
									<BackButton variant="default" handleGoBack={handleGoBack} />
									<Button onClick={() => setStep(4)} className="btn-next" size="lg">Agree and sell</Button></Stack></div>
						
					
				</>
			)}
			{step === 4 && (
				<>
					<SuccessContainer>
						<h4 className="modal-heading-title">
							{isUpdate ? 'Your tickes price has been updated' : 'Your tickets are listed for sale!' }
						</h4>
					</SuccessContainer>
					<p className="small">
							{isUpdate ? "Your updated price will be in effect within 2 hours on the marketplace. If your tickets are sold before the price is updated you will receive funds based on the original price." : "We will notify you via sms if a purchase is made. While your tickets are listed, you can change the price or delist them from the marketplace in 'My listings' at anytime" }	
					</p>
					<SuccessDisclaimer />
					<Stack className="btn-group-flex">
						{!isUpdate && (<Link to="/my-listings" className="btn btn-lg btn-outline-light">Go to My listings</Link>)}
						<Button onClick={handleClick} size='lg'>Close</Button>
						</Stack>
					</>
				
			)}</Modal.Body>
		</Fragment>
	);
}
