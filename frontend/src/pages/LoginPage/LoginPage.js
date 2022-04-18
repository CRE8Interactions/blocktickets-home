import React, { Fragment, useState, useEffect, useContext } from 'react';
import { verifyUser, verifiyCode, createNewUser } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import UserContext from '../../context/User/user';
import { LoginSignupForm } from '../../components';

import 'react-phone-number-input/style.css';

function LoginPage() {
	const [
		step,
		setStep
	] = useState(1);

	const [
		code,
		setCode
	] = useState('');

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

	let myData = {
		email: '',
		username: '',
		dob: '',
		gender: '',
		phoneNumber
	};

	const isValid = () => {
		let nv = myData['email'] !== '';
		let uv = myData['username'] !== '';
		let dv = myData['dob'] !== '';
		let gv = myData['gender'] !== '';
		if (nv && uv && dv && gv) {
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
				username: formData.username,
				gender: formData.gender,
				phoneNumber: formData.phoneNumber
			}
		};
		createNewUser(data).then((res) => {
			if (res.status === 200) {
				AuthService.setUser(res.data);
				navigate('/');
			}
		});
	};

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

	return <LoginSignupForm />;
}

export default LoginPage;
