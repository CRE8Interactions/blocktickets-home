import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyUser, verifiyCode, createNewUser } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import UserContext from '../../context/User/user';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { Error } from '../Error';
import { BackButton } from './../BackButton';

import 'react-phone-number-input/style.css';
import './loginSignupForm.scss';

export default function LoginSignupForm() {
	const location = useLocation();

	const comingFrom = location.pathname.slice(1);

	const [
		step,
		setStep
	] = useState(0);

	const [
		code,
		setCode
	] = useState('');

	const [
		hasError,
		setHasError
	] = useState(false);

	const [
		validated,
		setValidated
	] = useState(false);

	const [
		countryCode,
		setCountrycode
	] = useState('');

	const [
		phoneNumber,
		setValue
	] = useState();

	const [
		formValid,
		setFormValid
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState({});

	const { setAuthenticated } = useContext(UserContext);

	const navigate = useNavigate();

	const handleGoBack = () => {
		let curStep = step;
		setStep(--curStep);
	};

	useEffect(() => {
		axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));
	}, []);

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
			verifyUserCode(code);
		}
	}

	function submit() {
		let data = {
			data: {
				phoneNumber
			}
		};
		verifyUser(data)
			.then((res) => {
				setHasError(false);
				setStep(1);
			})
			.catch((err) => {
				setHasError(true);
				console.error(err);
			});
	}

	function verifyUserCode(code) {
		let data = {
			data: {
				code
			}
		};
		verifiyCode(data)
			.then((res) => {
				if (res.status === 200) {
					AuthService.setUser(res.data);
					setAuthenticated(res.data);
					setValidated(true);

					navigate('/');
				}
				else if (res.status === 203) {
					setStep(2);
				}
			})
			.catch((err) => {
				setHasError(true);
				setValidated(false);
				console.error(err);
			});
	}

	let myData = {
		email: '',
		name: '',
		username: '',
		dob: '',
		gender: '',
		phoneNumber
	};

	const isValid = () => {
		let ev = myData['email'] !== '';
		let uv = myData['username'] !== '';
		let nv = myData['name'] !== '';
		let dv = myData['dob'] !== '';
		let gv = myData['gender'] !== '';
		if (ev && uv && dv && gv && nv) {
			setFormValid(true);
			setFormData(myData);
		}
	};

	const handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		myData[name] = value;
		isValid();
	};

	const submitForm = () => {
		let data = {
			data: {
				dob: formData.dob,
				email: formData.email,
				name: formData.name,
				username: formData.username,
				gender: formData.gender,
				phoneNumber: formData.phoneNumber
			}
		};
		createNewUser(data).then((res) => {
			if (res.status === 200) {
				setHasError(false);
				AuthService.setUser(res.data);
				navigate('/');
			}
			else {
				setHasError(true);
			}
		});
	};

	return (
		<Row className="spacer-md  login-signup">
			<Col md={4}>{step > 0 && <BackButton handleGoBack={handleGoBack} />}</Col>
			<Col md={6} className="form-container d-flex-column">
				{step === 0 && (
					<Fragment>
						<div className="heading">
							<h1 className="fs-md">
								{comingFrom === 'login' ? 'Log in' : 'Sign Up'}
							</h1>
							<h2 className="normal text-muted fw-normal m-0">
								The future of ticketing is here
							</h2>
						</div>
						<div className="step-desc">
							<h3 className="title">
								{comingFrom === 'login' ? 'Verify' : 'Register'} your mobile number
							</h3>
							<p className="subtitle">
								Select your country and enter your mobile number. You'll receive an
								access code via text message.
							</p>
						</div>
						<Form.Group controlId="phone-number">
							<Form.Label>Mobile Number</Form.Label>
							<PhoneInput
								defaultCountry={countryCode}
								value={phoneNumber}
								required
								onChange={setValue}
								className={hasError ? 'error-border' : ''}
							/>
						</Form.Group>
						{hasError && <Error type="phone" />}

						<Button
							size="lg"
							className="icon-button btn-next"
							disabled={hasError}
							onClick={(e) => submit()}>
							Validate
						</Button>
						<small>
							{comingFrom === 'login' ? (
								'Don\t have an account yet?'
							) : (
								'Aready have an account?'
							)}{' '}
							{comingFrom === 'login' ? (
								<Link to={'/signup'}>Sign up</Link>
							) : (
								<Link to={'/login'}>Login</Link>
							)}
						</small>
					</Fragment>
				)}
				{step === 1 && (
					<Fragment>
						<div className="heading">
							<h3 className="title mb-1">Enter 4 Digit Verification</h3>
							<p className="subtitle">
								Code is set to <span className="text-primary">{phoneNumber}</span>
							</p>
						</div>
						<Form.Group controlId="code">
							<Form.Label>Enter Code</Form.Label>
							<Stack direction="horizontal" gap={3}>
								<Form.Control
									type="text"
									name="pincode"
									maxLength="1"
									id="num1"
									pattern="^0[1-9]|[1-9]\d$"
									required
									onChange={(e) => setVal(e)}
									className={hasError && 'error-border'}
								/>

								<Form.Control
									type="text"
									name="pincode"
									maxLength="1"
									id="num2"
									pattern="^0[1-9]|[1-9]\d$"
									required
									onChange={(e) => setVal(e)}
									className={hasError && 'error-border'}
								/>

								<Form.Control
									type="text"
									name="pincode"
									maxLength="1"
									id="num3"
									pattern="^0[1-9]|[1-9]\d$"
									required
									onChange={(e) => setVal(e)}
									className={hasError && 'error-border'}
								/>

								<Form.Control
									type="text"
									name="pincode"
									maxLength="1"
									id="num4"
									pattern="^0[1-9]|[1-9]\d$"
									required
									onChange={(e) => setVal(e)}
									className={hasError && 'error-border'}
								/>
							</Stack>
						</Form.Group>
						{hasError && <Error type="code" />}
						<Button size="lg" className="icon-button btn-next" disabled={hasError}>
							Validate
						</Button>
						<small>
							Did not recieve code? <Button variant="link">Resend Code</Button>
						</small>
					</Fragment>
				)}
				{step === 2 && (
					<Fragment>
						<div className="heading">
							<h1 className="text-uppercase">Let's Set Up your Profile</h1>
						</div>
						<Form className="d-flex-column">
							<Form.Group className="form-group" controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter your email"
									required
									name="email"
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>

							<Form.Group className="form-group" controlId="name">
								<Form.Label>First and Last Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter your full name"
									required
									name="name"
									onChange={(e) => handleChange(e)}
								/>
							</Form.Group>
							<Form.Group className="form-group" controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter your username"
									required
									name="username"
									onChange={(e) => handleChange(e)}
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
											onChange={(e) => handleChange(e)}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="form-group" controlId="gender">
										<Form.Label>Gender</Form.Label>
										<Form.Select
											name="gender"
											required
											onChange={(e) => handleChange(e)}>
											<option>Select Gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</Form.Select>
									</Form.Group>
								</Col>
							</Row>
							{hasError && <Error type="invalid" />}
							<Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
								Sign up
							</Button>
						</Form>
					</Fragment>
				)}
			</Col>
		</Row>
	);
}
