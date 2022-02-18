import React, { useState } from 'react';
import { verifyUser, verifiyCode } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const [
		phoneNumber,
		setPhoneNumber
	] = useState('');

	const [
		step,
		setStep
	] = useState(0);

	const [
		code,
		setCode
	] = useState('');

	const navigate = useNavigate();

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
					navigate('/dashboard');
				}
				else if (res.status === 203) {
					setStep(2);
				}
			})
			.catch((err) => console.error(err));
	}

	let fields;

	if (step === 0) {
	}
}

export default LoginPage;
