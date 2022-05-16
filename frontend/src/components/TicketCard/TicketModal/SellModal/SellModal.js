import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import { useWindowSize } from './../../../../utilities/hooks';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BackButton } from '../../../BackButton';
import { DisplayTickets } from '../DisplayTickets';
import { Numpad } from './Numpad';
import { SuccessContainer } from '../SuccessContainer';

import { SuccessDisclaimer } from '../SuccessDisclaimer';

export default function SellModal({ handleClose, setTicketStatus, ticketAction }) {

	const windowSize = useWindowSize();

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

	const [label, setLabel] = useState('Price per ticket')

	const [price, setPrice] = useState(0);

	const [priceValid, setPriceValid] = useState(price > 0 && (price > 1000 || price < 2000))

	// select tickets
	const [
		selectedTickets,
		setSelectedTickets
	] = useState([]);		

	useEffect(() => {
		if (price > 0 && (price < 1000 || price > 2000)) {
			setLabel("Enter amount between $1000.00 - $2000.00");
			setPriceValid(false)		  
	  } else { 
		  setLabel("Price per ticket") 
		  setPriceValid(true)
		}

	}, [ price ])

	useEffect(() => {
	  if (ticketAction === 'edit') {
		  setIsUpdate(true)
		  setStep(2)
	  }
	}, [])

		const handleGoBack = () => {
		setStep(step - 1)
	}
	
	const handleClick = () => {
		handleClose(); 
		if (!isUpdate && step === 4) setTicketStatus('listed')
	};	

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
						 <Form.Group controlId='price' className="form-card form-card-lg bg-info">
							<Form.Label className={!priceValid ? 'text-danger' : ''}>{label}</Form.Label>
								<Form.Control readOnly={windowSize < 768}
								  type="text" value={`$${price}`} maxLength="7" onChange={(e) => setPrice(e.target.value.substring(1).trim())} required
								/>
						</Form.Group> 
					{windowSize < 768 && (
							<Numpad price={price} setPrice={setPrice} />
						)} 
						<Stack direction="horizontal"  className="btn-group-flex">
							<BackButton variant="default" handleGoBack={handleGoBack} />
							<Button onClick={() => setStep(3)} className="btn-next" disabled={price === 0 || !priceValid} size="lg">Payout summary</Button>
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
