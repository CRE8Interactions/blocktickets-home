import React, { Fragment, useState, useEffect } from 'react';
import { createBankAccount, getBankAccount } from '../../../utilities/api';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ChequeImg } from '../../ChequeImg';

export default function BankAccountDetailsModal({ show, handleClose }) {
	const [
		formValid,
		setFormValid
	] = useState(false);

	const [
		routingNumError,
		setRoutingNumError
	] = useState(false);

	const [
		accountNumError,
		setAccountNumError
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState({});

	const [
		account,
		setAccount
	] = useState('checking');

	const [
		firstName,
		setFirstName
	] = useState();

	const [
		lastName,
		setLastName
	] = useState();

	const [
		accountNumber,
		setAccountNumber
	] = useState('');

	const [
		routingNumber,
		setRoutingNumber
	] = useState('');

	// reset error when inputs are changed
	useEffect(
		() => {
			validInputs();
		},
		[
			account,
			firstName,
			lastName,
			accountNumber,
			routingNumber
		]
	);

	// reset error when accountNumber input changed
	useEffect(
		() => {
			setAccountNumError(false);
		},
		[
			accountNumber
		]
	);

	// reset error when rountingNumber input change
	useEffect(
		() => {
			setRoutingNumError(false);
		},
		[
			routingNumber
		]
	);

	useEffect(() => {
		validInputs();

		getBankAccount().then((res) => console.log(res)).catch((err) => console.error(err));
	}, []);

	const validInputs = () => {
		if (account && firstName && lastName && accountNumber && routingNumber) {
			setFormValid(true);
		}
		else {
			setFormValid(false);
		}
	};

	const submitForm = () => {
		if (routingNumber.length < 9) {
			setRoutingNumError(true);
		}
		if (accountNumber.length < 9) {
			setAccountNumError(true);
		}
		if (validInputs() && !routingNumError && !accountNumError) {
			let data = {
				data: {
					accountType: account,
					firstName,
					lastName,
					accountNumber,
					routingNumber,
					currency: 'usd'
				}
			};

			createBankAccount(data)
				.then((res) => console.log(res))
				.catch((err) => console.error(err));
		}
	};

	return (
		<Fragment>
			<Modal
				show={show}
				centered
				onHide={handleClose}
				backdrop={'static'}
				scrollable
				animation={false}>
				<Modal.Header closeButton>
					<Modal.Title as="h5">Bank Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="d-flex-column">
						<Form.Group className="form-group" controlId="account">
							<Form.Label>Payout Type</Form.Label>
							<Form.Select
								name="account"
								value={account}
								onChange={(e) => setAccount(e.target.value)}
								required>
								<option value="checking">Checking</option>
								<option value="savings">Savings</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="form-group" controlId="firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your first name"
								required
								name="firstName"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="form-group" controlId="lastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your last name"
								required
								name="lastName"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>
						<div className="d-flex-column mt-3 align-items-center">
							<ChequeImg />
						</div>
						<Form.Group className="form-group" controlId="routingNumber">
							<Form.Label>Routing Number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter routing number"
								required
								value={routingNumber}
								pattern="[0-9]*"
								maxLength="9"
								name="routingNumber"
								onChange={(e) =>
									setRoutingNumber(
										(routing) =>
											e.target.validity.valid || e.target.value === ''
												? e.target.value
												: routing
									)}
								className={routingNumber && routingNumError && 'error-border'}
							/>
							{routingNumber &&
							routingNumError && (
								<Form.Text className="text-danger">
									Routing Number must be 9 digits
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group className="form-group" controlId="accountNumber">
							<Form.Label>Account Number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter account number"
								required
								value={accountNumber}
								pattern="[0-9]*"
								name="accountNumber"
								onChange={(e) =>
									setAccountNumber(
										(acc) =>
											e.target.validity.valid || e.target.value === ''
												? e.target.value
												: acc
									)}
								className={accountNumber && accountNumError && 'error-border'}
							/>
							{accountNumber &&
							accountNumError && (
								<Form.Text className="text-danger">
									Account Number is invalid. Please try again
								</Form.Text>
							)}
						</Form.Group>

						<Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
							Save Bank details
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
}
