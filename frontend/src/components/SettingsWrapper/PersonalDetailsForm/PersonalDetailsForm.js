import React, { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { updatePersonalDetails } from '../../../utilities/api';
import authService from '../../../utilities/services/auth.service';

export default function PersonalDetailsForm() {
	let user = sessionStorage.getItem('user')
	user = JSON.parse(user).user

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
	] = useState(user.name);
	const [
		username,
		setUsername
	] = useState(user.username);
	const [
		email,
		setEmail
	] = useState(user.email);
	const [
		dob,
		setDob
	] = useState(user.dob);
	const [
		gender,
		setGender
	] = useState(user.gender);

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
			} else {
				setFormValid(false);
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

	useEffect(() => {
		// set default value for gender dropdown
		let select = document.getElementById('gender')
		for (let i = 0; i < select.options.length; i ++) {
			if (select.options[i].value === user.gender) select.options[i].setAttribute('selected', true)
		}
		if (name && email && gender && dob && username) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}, [])

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

	const submitForm = () => {
		let data = {
			data: {
				dob,
				email,
				name,
				username,
				gender
			}
		};

		updatePersonalDetails(data)
			.then((res) => authService.setUser(res.data))
			.catch((err) => console.error(err))
	};

	return (
		<Fragment>
			<Form className="d-flex-column">
				<Form.Group className="form-group" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						required
						name="email"
						defaultValue={user.email}
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
						defaultValue={user.name}
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
						defaultValue={user.username}
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
								defaultValue={user.dob}
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
								defaultValue={user.gender}
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
