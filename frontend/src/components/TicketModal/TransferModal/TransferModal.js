import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { createTicketTransfer } from '../../../utilities/api';

import { Error } from '../../Error';
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { DisplayTickets } from '../DisplayTickets';

export default function TransferModal({ handleClose, setTicketStatus, order }) {

	// 1 - tranfer 
	// 2 - phone number 
	// 3 - confirmation 
	// 4 - success
	const [
		step,
		setStep
	] = useState(1);

	// select tickets
	const [
		selectedTickets,
		setSelectedTickets
	] = useState([]);

	const [
		phoneNumber,
		setPhoneNumber
	] = useState('');

	const [
		countryCode,
		setCountrycode
	] = useState('');

	const [isValid, setIsValid] = useState(true)

	useEffect(() => {
		axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));

	}, []);


	// reset validation
	useEffect(() => {
	  if (!phoneNumber) {
		  setIsValid(true)
	  }
	
	}, [ phoneNumber])
	

		const submit = (e) => {
		if (e) e.preventDefault(); 
		if (validNumber())
		setStep(3)
		else { setIsValid(false)}
	};

	const submitTransfer = () => {
		let ticketIds = selectedTickets.map((ticket) => ticket.id)
		let data = {
			phoneNumber: phoneNumber,
			orderId: order.id,
			ticketIds
		};

		createTicketTransfer(data)
			.then((res) => {
				setStep(4)
			})
			.catch((err) => console.error(err));
	 }

	const validNumber = () => {
		return phoneNumber && isValidPhoneNumber(phoneNumber);
	};

	const handleClick = () => {
		handleClose(); 
		if (step === 4) setTicketStatus('transferred')
	};

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title as="h5">Transfer</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{step === 1 &&  (
				<>             
				<DisplayTickets status="transfer" role='select' setSelectedTickets={setSelectedTickets} tickets={order?.tickets} />
				<Stack  direction="horizontal" className="btn-group-flex">
					<Button onClick={() => setStep(2)} className="btn-next" size="lg" disabled={selectedTickets.length === 0 } >
							Next
						</Button>
				</Stack>
					</>)}
				{step === 2 && (
				<Fragment>
							<div className="modal-body-heading">
								<h4 className="modal-body-heading-title">
									Enter the recepient phone number{' '}
								</h4>
								<p className="small">
									The recipient will get notified via sms that you have transferred your tickets to them.
								</p>
							</div>
						<Form onSubmit={(e) => submit(e)}>
							<Form.Group controlId="phone-number">
								<Form.Label>Phone Number</Form.Label>
								<PhoneInput
									autoComplete={'off'}
									defaultCountry={countryCode}
									value={phoneNumber}
									required
									onChange={(e) => setPhoneNumber(e)}
									className={phoneNumber && !isValid ? 'error-border' : ''}
								/>

								<span>{phoneNumber && !isValid && (<Error type="phone" />)}</span>
							</Form.Group>
						</Form>
							<Stack direction="horizontal" className="btn-group-flex">
								<Button
									onClick={submit}
									disabled={!phoneNumber || !isValid} size="lg" className="btn-next">
									Transfer
								</Button>
							</Stack>
					</Fragment>
				)} 
				{step === 3 && (
					<Fragment>
							<div className="modal-body-heading">
								<h4 className="modal-body-heading-title">
									Are you sure you want to transfer these tickets?
								</h4>
								<DisplayTickets selectedTickets={selectedTickets} />
							</div>
							<div>
								<p className='fw-medium text-muted mb-2'>Recipient phone number</p>
								<span className='fs-md fw-bold'>{phoneNumber}</span>
							</div>
							<Stack className="btn-group-flex">
								<Button onClick={handleClose} variant="outline-light" size="lg">Cancel</Button>
								<Button
									onClick={(e) => submitTransfer()}
									size="lg" >
									Transfer
								</Button>
							</Stack>
					</Fragment>
				)}
				{step === 4 && (
					<Fragment>
						<SuccessContainer>
							<h4 className="modal-body-heading-title">Your tickets have been transferred! </h4>
						</SuccessContainer>

						<p className="small">
							Your transfer is pending till the recipient claims the tickets. You can cancel the transfer while it's pending. Once it's claimed by the recipient the tickets will no longer be in your account. 
						</p>
					<SuccessDisclaimer />

						<Stack className="btn-group-flex">
							<Link to="/my-transfers" className="btn btn-lg btn-outline-light">Go to My transfers</Link>
							<Button onClick={handleClick} size='lg'>Close</Button></Stack>
					</Fragment>
				)}
			</Modal.Body>
		</Fragment>
	);
}
