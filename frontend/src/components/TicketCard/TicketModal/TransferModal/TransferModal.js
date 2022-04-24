import React, { Fragment, useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

import { Error } from './../../../Error';
import { SuccessContainer } from './../SuccessContainer';

export default function TransferModal() {
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

	const submit = () => {
		data = {
			phoneNumber
		}
	}

	useEffect(() => {
		axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));
	}, []);

	return (
		<Fragment>
			<Modal.Header closeButton>
				<div>
					<Modal.Title as="h4">Transfer ticket</Modal.Title>
					<p className="ticket-code">nicfanciulli #9358</p>
				</div>
			</Modal.Header>
			<Modal.Body>
				{step === 'successful' ? (
					<Fragment>
						<SuccessContainer>
							<h4 className="m-0 modal-heading-title">Transfer completed!</h4>
						</SuccessContainer>
						<p className="small">
							We have transferred your ticket to the recipient. If they have not
							received it please reach out to us.
						</p>
					</Fragment>
				) : (
					<Fragment>
						<div className="modal-heading">
							<h4 className="modal-heading-title">
								Enter the recepient phone number{' '}
							</h4>
							<p className="small">
								The recipient will get notified via text that you have transferred
								your ticket to them.
							</p>
						</div>
						<Form>
							<Form.Group controlId="phone-number">
								<Form.Label>Phone Number</Form.Label>
									<PhoneInput
									defaultCountry={countryCode}
									value={phoneNumber}
									required
									onChange={(e) => setphoneNumber}
									className={hasError ? 'error-border' : ''}
								/>
							</Form.Group>
							<Form.Control.Feedback type="invalid">
								<Error type="phone" />
							</Form.Control.Feedback>
							<Button onClick={() => setStep('successful')} variant="primary">
								Transfer
							</Button>
						</Form>
					</Fragment>
				)}
			</Modal.Body>
		</Fragment>
	);
}
