import React, { Fragment, useState, useEffect, useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginSecurityForm() {
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
		code,
		setCode
	] = useState('');

	const [
		newPhoneNumber
	] = useState();

	const [
		phoneNumber,
		setValue
	] = useState();

	// reset error when inputs are changed
	useEffect(
		() => {
			setHasError(false);
		},
		[
			formValid,
			phoneNumber,
			code
		]
	);

	useEffect(
		() => {
			if (phoneNumber && newPhoneNumber && code) {
				setFormValid(true);
			}
		},
		[
			phoneNumber,
			newPhoneNumber,
			code
		]
	);

	function submit() {
		let data = {
			data: {
				phoneNumber
			}
		};
	}

	const submitForm = () => {
		let data = {
			data: {
				phoneNumber,
				newPhoneNumber
			}
		};
	};

	function verifyUserCode(code) {
		let data = {
			data: {
				code
			}
		};
		verifiyCode(data)
			.then((res) => {
				if (res.status === 200) {
					setAuthenticated(res.data);
				}
			})
			.catch((err) => {
				setHasError(true);
				console.error(err);
			});
	}

	return (
		<Fragment>
			<Form className="d-flex-column">
				<Form.Group className="form-group" controlId="phoneNumber">
					<Form.Label>Current Phone Number</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter your current number"
						required
						pattern="^0[1-9]|[1-9]\d$"
						name="phoneNumber"
						onChange={(e) => setNumber(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="form-group" controlId="newPhoneNumber">
					<Form.Label>New Phone Number</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter your new number"
						required
						pattern="^0[1-9]|[1-9]\d$"
						name="newPhoneNumber"
						onChange={(e) => setVal(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="form-group" controlId="code">
					<Form.Label>Verify Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the 4 digit code"
						required
						name="code"
						onChange={(e) => setCode(e.target.value)}
					/>
					<Form.Text>
						A new code should have been set using the new phone number specified.
					</Form.Text>
				</Form.Group>
				<Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
					Update Phone Number
				</Button>
			</Form>
		</Fragment>
	);
}
