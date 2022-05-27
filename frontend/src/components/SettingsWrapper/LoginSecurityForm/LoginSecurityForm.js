import React, { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

export default function LoginSecurityForm() {
	const [
		formValid,
		setFormValid
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
			<Form className="d-flex-column" id="login-security-form">
				<Form.Group className="form-group" controlId="phoneNumber">
					<Form.Label>Current Phone Number</Form.Label>
					<Form.Control
						type="tel"
						pattern="^0[1-9]|[1-9]\d$"
						name="phoneNumber"
						placeholder="Enter your current phone number"
					/>
				</Form.Group>

				<Form.Group className="form-group" controlId="newPhoneNumber">
					<Form.Label>New Phone Number</Form.Label>
					<div className="input-wrapper">
						<Form.Control
							type="tel"
							placeholder="Enter your new number"
							required
							pattern="^0[1-9]|[1-9]\d$"
							name="newPhoneNumber"
							onChange={(e) => setVal(e.target.value)}
						/>
						<Badge className="badge-outline badge-outline--light text-normal p-2">Verify via text</Badge>
					</div>
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
					<Form.Text className="d-block mt-2">
						A new code should have been set to you using the new phone number specified above.
					</Form.Text>
				</Form.Group>
				<Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
					Update Phone Number
				</Button>
			</Form>
		</Fragment>
	);
}
