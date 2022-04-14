import { useState, useContext, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import UserContext from '../../context/User/User';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utilities/services/auth.service';
import { verifyUser, verifiyCode } from '../../utilities/api';

export default function Login() {
  const [step,setStep] = useState(0);
	const [countryCode,setCountrycode] = useState('');
	const [phoneNumber,setValue] = useState();
	const { setAuthenticated } = useContext(UserContext);
	const navigate = useNavigate();

  useEffect(() => {
    axios
			.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
			.then((res) => setCountrycode(res.data.country_code));
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
					setAuthenticated(res.data);
					navigate('/');
				}
				else if (res.status === 203) {
					setStep(2);
				}
			})
			.catch((err) => console.error(err));
	}

	let cardTitle;
	let cardText;

	if (step === 0) {
		cardTitle = 'Verify your mobile number';
		cardText = `Select your country and enter your mobile number. You'll receive an access code via text message.`;
	}
	else if (step === 1) {
		cardTitle = 'Check your mobile phone';
		cardText = `A text message has been sent to ${phoneNumber}. Enter the 4-digit code.`;
	}
	else if (step === 2) {
		cardTitle = `Lets setup your profile`;
	}

  return (
    <Row className="justify-content-md-center">
			<Col md="auto">
				<Card className="text-center">
					<Card.Title>{cardTitle}</Card.Title>
					<Card.Body>
						{step === 0 && (
							<div>
								<p>{cardText}</p>
								<PhoneInput
									defaultCountry={countryCode}
									placeholder="Enter phone number"
									value={phoneNumber}
									onChange={setValue}
								/>
								<Button variant="primary" onClick={(e) => submit()}>
									Validate
								</Button>
							</div>
						)}
						{step === 1 && (
							<div>
								<p>{cardText}</p>
								<Row>
									<Col xs={2}>
										<input
											type="text"
											name="pincode"
											maxLength="1"
											id="num1"
											pattern="^0[1-9]|[1-9]\d$"
											required
											onChange={(e) => setVal(e)}
										/>
									</Col>
									<Col xs={2}>
										<input
											type="text"
											name="pincode"
											maxLength="1"
											id="num2"
											pattern="^0[1-9]|[1-9]\d$"
											required
											onChange={(e) => setVal(e)}
										/>
									</Col>
									<Col xs={2}>
										<input
											type="text"
											name="pincode"
											maxLength="1"
											id="num3"
											pattern="^0[1-9]|[1-9]\d$"
											required
											onChange={(e) => setVal(e)}
										/>
									</Col>
									<Col xs={2}>
										<input
											type="text"
											name="pincode"
											maxLength="1"
											id="num4"
											pattern="^0[1-9]|[1-9]\d$"
											required
											onChange={(e) => setVal(e)}
										/>
									</Col>
								</Row>
							</div>
						)}
					</Card.Body>
				</Card>
			</Col>
		</Row>
  )
}