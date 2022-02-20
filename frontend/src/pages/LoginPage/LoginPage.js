import React, { useState, useEffect } from 'react';
import { verifyUser, verifiyCode } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';


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
					navigate('/');
				}
				else if (res.status === 203) {
					setStep(2);
				}
			})
			.catch((err) => console.error(err));
	}

	const handleChange = (event) => {
		setGender(event.target.value)
	}

	let cardTitle;
	let cardText;

	if (step === 0) {
		cardTitle = 'Verify your mobile number';
		cardText = `Enter your mobile number including your country code. You'll receive an access code via text message.`;
	} else if (step === 1) {
		cardTitle = 'Check your mobile phone';
		cardText = `A text message has been sent to ${phoneNumber}. Enter the 4-digit code.`;
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
								<p>Create Profile</p>
							</div>
						}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default LoginPage;
