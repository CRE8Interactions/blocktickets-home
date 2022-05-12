import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { createTicketTransfer } from '../../../../utilities/api';

import { Error } from './../../../Error';
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { DisplayTickets } from '../DisplayTickets';

export default function TransferModal({ handleClose, setTicketStatus, ticket, order }) {

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

	const [
		hasError,
		setHasError
	] = useState(false);

	const [isSubmitted, setIsSubmitted] = useState(false)

	const submit = () => {
		setIsSubmitted(true);
		setStep(3)
	};

	//  const oId = ticket.uuid.split('-')[4]

	useEffect(() => {
		axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));
	}, []);

	const submitTransfer = () => {
		setStep(4)
		// let data = {
		// 	phoneNumber: phoneNumber,
		// 	orderId: order.id,
		// 	ticketId: ticket.id
		// };

	// 	createTicketTransfer(data)
	// 		.then((res) => {
	// 			setStep('successful');
	// 		})
	// 		.catch((err) => console.error(err));
	 };

	const validNumber = () => {
		return phoneNumber && isValidPhoneNumber(phoneNumber);
	};

	const handleClick = () => {
		handleClose(); 
		if (step === 4) setTicketStatus('transferred')
	};

	return (
		<Fragment>
			<Modal.Header className="heading--flex">
				<Modal.Title as="h5">Transfer</Modal.Title>
				<Button variant="close" onClick={handleClose} />
			</Modal.Header>
			<Modal.Body>
				{step === 1 &&  (
				<>             
				<DisplayTickets status="transfer" role='select' setSelectedTickets={setSelectedTickets}/>
				<Stack  direction="horizontal" className="btn-group-flex">
					<Button onClick={() => setStep(2)} className="btn-next" size="lg" disabled={selectedTickets.length === 0 } >
							Next
						</Button>
				</Stack>
					</>)}
				{step === 2 && (
				<Fragment>
							<div className="modal-heading">
								<h4 className="modal-heading-title">
									Enter the recepient phone number{' '}
								</h4>
								<p className="small">
									The recipient will get notified via sms that you have transferred your tickets to them.
								</p>
							</div>
						<Form>
							<Form.Group controlId="phone-number">
								<Form.Label>Phone Number</Form.Label>
								<PhoneInput
									autoComplete={'off'}
									defaultCountry={countryCode}
									value={phoneNumber}
									required
									onChange={(e) => setPhoneNumber(e)}
									className={isSubmitted  &&!validNumber() ? 'error-border' : ''}
								/>
							</Form.Group>
							{ isSubmitted && !validNumber() && (
								<Error type="phone" />
							)}
						</Form>
							<Stack direction="horizontal" className="btn-group-flex">
								<Button
									onClick={submit}
									disabled={!validNumber()} size="lg" className="btn-next">
									Transfer
								</Button>
							</Stack>
					</Fragment>
				)} 
				{step === 3 && (
					<Fragment>
							<div className="modal-heading">
								<h4 className="modal-heading-title">
									Are you sure you want to transfer these tickets?
								</h4>
								<DisplayTickets />
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
							<h4 className="modal-heading-title">Your tickets have been transferred! </h4>
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
