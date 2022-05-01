import React, { Fragment, useState, useEffect, useContext } from 'react';
import { createBankAccount, getBankAccount } from '../../../utilities/api';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BankAccountDetailsModal({ show, handleClose }) {
	const [
		formValid,
		setFormValid
	] = useState(false);

	const [
		hasError,
		setHasError
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState({});

	const [
		currency,
		setCurrency
	] = useState();

	const [
		country,
		setCountry
	] = useState();

	const [
		holder,
		setHolder
	] = useState();

	const [
		company,
		setCompany
	] = useState();

	const [
		address,
		setAddress
	] = useState();

	const [
		account,
		setAccount
	] = useState('checking');

	const [
		bankName,
		setBankName
	] = useState();

	const [
		accountNumber,
		setAccountNumber
	] = useState();

	const [
		routingNumber,
		setRoutingNumber
	] = useState();

	const [
		accountNickname,
		setAccountNickname
	] = useState();

	// reset error when inputs are changed
	useEffect(
		() => {
			validInputs()
		},
		[
			account, bankName, accountNumber, routingNumber, accountNickname
		]
	);

	useEffect(() => {
		validInputs()

		getBankAccount()
			.then((res) => console.log(res))
			.catch((err) => console.error(err))
	}, []);

	const validInputs = () => {
		if (account && bankName && accountNumber && routingNumber && accountNickname) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}

	const submitForm = () => {
		let data = {
			data: {
				accountType: account,
				accountNumber,
				routingNumber,
				accountName: accountNickname,
				currency: 'usd',
				bankName
			}
		};

		createBankAccount(data)
			.then((res) => console.log(res))
			.catch((err) => console.error(err))
	};

	return (
		<Fragment>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Bank Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="d-flex-column">
						{/* <Form.Group className="form-group" controlId="currency">
							<Form.Label>Currency</Form.Label>
							<Form.Select
								name="currency"
								value={currency}
								onChange={() => setCurrency(e.target.value)}
								required>
								<option>United States Dollars USD</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="form-group" controlId="country">
							<Form.Label>In Which Country will you be Paid</Form.Label>
							<Form.Select
								name="country"
								value={country}
								onChange={() => setCountry(e.target.value)}
								required>
								<option>United States</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="form-group" controlId="holder">
							<Form.Label>Account Holder Information</Form.Label>
							<Form.Select
								name="country"
								value={holder}
								onChange={() => setHolder(e.target.value)}
								required>
								<option>Company</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="form-group" controlId="companyName">
							<Form.Label>Company Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Company Name"
								required
								name="companyName"
								onChange={(e) => setCompany(e.target.value)}
							/>
						</Form.Group> */}
						<Form.Group className="form-group" controlId="account">
							<Form.Label>Bank Account Information</Form.Label>
							<Form.Select
								name="account"
								value={account}
								onChange={(e) => setAccount(e.target.value)}
								required>
								<option value='checking'>Checking</option>
								<option value='savings'>Savings</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="form-group" controlId="bankName">
							<Form.Label>Bank Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Bank Name"
								required
								name="bankName"
								onChange={(e) => setBankName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="form-group" controlId="accountNumber">
							<Form.Label>Account Number</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter account number"
								required
								name="accountNumber"
								onChange={(e) => setAccountNumber(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="form-group" controlId="routingNumber">
							<Form.Label>Routing Number</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter routing number"
								required
								name="routingNumber"
								onChange={(e) => setRoutingNumber(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="form-group" controlId="accountNickname">
							<Form.Label>Account Nickname</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter account nickname"
								required
								name="accountNickname"
								onChange={(e) => setAccountNickname(e.target.value)}
							/>
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
