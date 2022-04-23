import React, { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PersonalDetailsForm() {
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
		name,
		setName
	] = useState('');
	const [
		username,
		setUsername
	] = useState('');
	const [
		email,
		setEmail
	] = useState('');
	const [
		dob,
		setDob
	] = useState('');
	const [
		gender,
		setGender
	] = useState('');

	// reset error when inputs are changed
	useEffect(
		() => {
			setHasError(false);
		},
		[
			formValid
		]
	);

	useEffect(
		() => {
			if (name && email && gender && dob && username) {
				setFormValid(true);
			}
		},
		[
			name,
			username,
			email,
			dob,
			gender
		]
	);

	function setVal(e) {
		const num1 = document.getElementById('num1');
		const num2 = document.getElementById('num2');
		const num3 = document.getElementById('num3');
		const num4 = document.getElementById('num4');

		if (num1.value) num2.focus();
		if (num1.value && num2.value) num3.focus();
		if (num1.value && num2.value && num3.value) num4.focus();
		if (num1.value && num2.value && num3.value && num4.value) {
			const code = Number(`${num1.value}${num2.value}${num3.value}${num4.value}`);
		}
	}

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
				dob,
				email,
				name,
				username,
				gender,
				phoneNumber
			}
		};
	};

	return (
		<Fragment>
			<div className="heading">
				<h1 className="fs-md">Personal Details</h1>
				<h2 className="normal text-muted fw-normal m-0">
					Access and change your personal details
				</h2>
			</div>
			<Form className="d-flex-column">
				<Form.Group className="form-group" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						required
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="form-group" controlId="name">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your full name"
						required
						name="name"
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="form-group" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your username"
						required
						name="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Row className="form-group">
					<Col>
						<Form.Group className="form-group" controlId="dob">
							<Form.Label>Birth Date</Form.Label>
							<Form.Control
								type="date"
								name="dob"
								required
								onChange={(e) => setDob(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="form-group" controlId="gender">
							<Form.Label>Gender</Form.Label>
							<Form.Select
								name="gender"
								required
								onChange={(e) => setGender(e.target.value)}>
								<option>Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				<Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
					Update Profile
				</Button>
			</Form>
		</Fragment>
	);
}
