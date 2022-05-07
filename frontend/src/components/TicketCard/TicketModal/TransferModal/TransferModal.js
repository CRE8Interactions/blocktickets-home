import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { createTicketTransfer } from '../../../../utilities/api';

import { Error } from './../../../Error';
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { SelectTickets } from '../SelectTickets';

export default function TransferModal({ handleClose, setTicketStatus, ticket, order }) {
	const [
		step,
		setStep
	] = useState('transfer');

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
		setStep('confirmation')
	};

	 const oId = ticket.uuid.split('-')[4]

	useEffect(() => {
		axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));
	}, []);

	const submitTransfer = () => {
		let data = {
			phoneNumber: phoneNumber,
			orderId: order.id,
			ticketId: ticket.id
		};

		createTicketTransfer(data)
			.then((res) => {
				setStep('successful');
			})
			.catch((err) => console.error(err));
	};

	const validNumber = () => {
		return phoneNumber && isValidPhoneNumber(phoneNumber);
	};

	const handleClick = () => {
		handleClose(); 
		if (step === 'successful') setTicketStatus('transferred')
	};

	return (
		<Fragment>
			<Card.Header className="heading--flex">
				<Card.Title as="h5">Transfer</Card.Title>
				<Button variant="close" onClick={handleClose} />
			</Card.Header>
			<Card.Body>
				{step === 'transfer' &&  (
				<><SelectTickets status="transfer" />
				<Stack  direction="horizontal" className="btn-group-flex">
					<Button onClick={() => setStep('phone')} className="icon-button btn-next" size="lg">
							Next
						</Button>
				</Stack>
					</>)}
				{step === 'phone' && (
				<Fragment>
							<div className="card-heading">
								<h4 className="card-heading-title">
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
									disabled={!validNumber()} size="lg" className="icon-button btn-next">
									Transfer
								</Button>
							</Stack>
					</Fragment>
				)} 
				{step === 'confirmation' && (
					<Fragment>
							<div className="card-heading">
								<h4 className="card-heading-title">
									Are you sure you want to transfer this ticket?
								</h4>
							</div>
							<div>
								<p className='fw-medium text-muted mb-2'>Recipient phone number</p>
								<span className='fs-md fw-bold'>{phoneNumber}</span>
							</div>
							<Stack className="btn-group-flex" gap={3}>
								<Button onClick={() => setStep('phone')} variant="outline-light" size="lg" className="w-100 flex-shrink-1">Cancel</Button>
								<Button
									onClick={(e) => submitTransfer()}
									size="lg" className="w-100 flex-shrink-1" >
									Transfer
								</Button>
							</Stack>
					</Fragment>
				)}
				{step === 'successful' && (
					<Fragment>
						<SuccessContainer>
							<h4 className="card-heading-title">Your tickets have been transferred! </h4>
						</SuccessContainer>
					<SuccessDisclaimer />

						<p className="small">
							Your transfer is pending till the recipient claims the tickets. You can cancel the transfer while it's pending. Once it's claimed by the recipient the tickets will no longer be in your account. 
						</p>
						<Stack direction="horizontal" className="btn-group-flex"><Button onClick={handleClick} size='lg'>Close</Button></Stack>
					</Fragment>
				)}
			</Card.Body>
		</Fragment>
	);
}
