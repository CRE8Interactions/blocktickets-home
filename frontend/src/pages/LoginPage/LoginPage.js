import React, { useState, useEffect, useContext } from 'react';
import { verifyUser, verifiyCode, createNewUser } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import UserContext from '../../context/User/user';


function LoginPage() {
	const [
		step,
		setStep
	] = useState(0);

	const [
		code,
		setCode
	] = useState('');

	const [
		countryCode,
		setCountrycode
	] = useState('');

	const [phoneNumber, setValue] = useState()

	const [formValid, setFormValid] = useState(false)
	const [formData, setFormData] = useState({})
	const { setAuthenticated } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then(res => setCountrycode(res.data.country_code))
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
			verifyUserCode(code);
		}
	}

	function submit() {
		let data = {
			data: {
				phoneNumber
			}
		};
		verifyUser(data).then((res) => setStep(1)).catch((err) => console.error(err));
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
					setAuthenticated(res.data)
					navigate('/');
				}
				else if (res.status === 203) {
					setStep(2);
				}
			})
			.catch((err) => console.error(err));
	}

	let myData = {
		email: '',
		username: '',
		dob: '',
		gender: '',
		phoneNumber
	}

	const isValid = () => {
		let nv = myData['email'] !== ''
		let uv = myData['username'] !== ''
		let dv = myData['dob'] !== ''
		let gv = myData['gender'] !== ''
		if (nv && uv && dv && gv) {
			setFormValid(true)
			setFormData(myData)
		}
	}

	const handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		myData[name] = value;
		isValid()
	}

	const submitForm = () => {
		let data = {
			data: {
				dob: formData.dob,
				email: formData.email,
				username: formData.username,
				gender: formData.gender,
				phoneNumber: formData.phoneNumber
			}
		}
		createNewUser(data).then((res) => {
			if (res.status === 200) {
				AuthService.setUser(res.data);
				navigate('/');
			}
		})
	}

	let cardTitle;
	let cardText;

	if (step === 0) {
		cardTitle = 'Verify your mobile number';
		cardText = `Enter your mobile number including your country code. You'll receive an access code via text message.`;
	} else if (step === 1) {
		cardTitle = 'Check your mobile phone';
		cardText = `A text message has been sent to ${phoneNumber}. Enter the 4-digit code.`;
	} else if (step === 2) {
		cardTitle = `Lets setup your profile`
	}
	
	return (
		<Row className="justify-content-md-center">
			<Col md="auto">
				<Card className="text-center">
				<Card.Title>{cardTitle}</Card.Title>
					<Card.Body>
						{step === 0 &&
						<div>
							<p>{cardText}</p>
							<PhoneInput
								defaultCountry={countryCode}
								placeholder="Enter phone number"
								value={phoneNumber}
								onChange={setValue}/>
								<p>Must include your country-code, for example +1</p>
								<Button variant="primary" onClick={(e) => submit()}>Validate</Button>
						</div>
						}
						{step === 1 &&
							<div>
								<p>{cardText}</p>
								<Row>
									<Col xs={2}>
										<input type="text"  name="pincode" maxLength="1"  id="num1" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
									</Col>
									<Col xs={2}>
										<input type="text"  name="pincode" maxLength="1"  id="num2" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
									</Col>
									<Col xs={2}>
										<input type="text"  name="pincode" maxLength="1"  id="num3" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
									</Col>
									<Col xs={2}>
									<input type="text"  name="pincode" maxLength="1"  id="num4" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
									</Col>
								</Row>
							</div>
						}
						{step === 2 &&
							<div>
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)}/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicUsername">
										<Form.Control type="text" placeholder="Enter a username" name="username" onChange={(e) => handleChange(e)}/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicDob">
										<Form.Control type="date" name="dob" onChange={(e) => handleChange(e)}/>
										<Form.Text className="text-muted">
											Enter your Date of Birth.
										</Form.Text>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicDob">
									<Form.Select aria-label="Default select gender" name="gender" onChange={(e) => handleChange(e)}>
										<option>Select your gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</Form.Select>
									</Form.Group>
									<Button variant="primary" type="button" disabled={!formValid} onClick={(e) => submitForm()}>
										Submit
									</Button>
								</Form>
							</div>
						}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default LoginPage;
