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

	const handleChange = (event) => {
		setGender(event.target.value)
	}

	let fields;

	if (step === 0) {
		fields = 
		<h1>Form Here</h1>
		// <CardContent>
		// 	<Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
		// 		Verify your mobile number
		// 	</Typography>
		// 	<Typography sx={{ fontSize: 14 }} component="div">
		// 		Enter your mobile number including your country code. You'll receive an access
		// 		code via text message.
		// 	</Typography>
		// 	<input type="text" onBlur={(e) => setPhoneNumber(e.target.value)} />
		// 	<Typography variant="body2">
		// 		Must include your country-code, for example +1
		// 	</Typography>
		// </CardContent>
	} else if (step === 2) {
		fields = 
		<h1>Form Here</h1>
		// <CardContent>
		// 	<Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
		// 		Enter a email address
		// 	</Typography>
		// 	<input type="email" />
		// 	<Typography sx={{ fontSize: 14 }} component="div">
		// 		Enter a username
		// 	</Typography>
		// 	<input type="text" />
		// 	<FormControl fullWidth>
    //     <InputLabel id="demo-simple-select-label">Gender</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={gender}
    //       label="Gender"
    //       onChange={handleChange}
    //     >
    //       <MenuItem value={'male'}>Male</MenuItem>
    //       <MenuItem value={'female'}>Female</MenuItem>
    //     </Select>
    //   </FormControl>
		// </CardContent>
	} else {
		fields =
		// <CardContent>
		// 	<Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
		// 		Check your mobile phone
		// 	</Typography>
		// 	<Typography sx={{ fontSize: 14 }} component="div">
		// 		A text message has been sent to <br />
		// 		{phoneNumber}. Enter the 4-digit code.
		// 	</Typography>
		// 	<List>
		// 		<ListItem>
		// 			<input type="text"  name="pincode" maxLength="1"  id="num1" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
		// 		</ListItem>
		// 		<ListItem>
		// 			<input type="text"  name="pincode" maxLength="1"  id="num2" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
		// 		</ListItem>
		// 		<ListItem>
		// 			<input type="text"  name="pincode" maxLength="1"  id="num3" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
		// 		</ListItem>
		// 		<ListItem>
		// 			<input type="text"  name="pincode" maxLength="1"  id="num4" pattern="^0[1-9]|[1-9]\d$" required onChange={(e) => setVal(e)} />
		// 		</ListItem>
		// 	</List>

		// </CardContent>
		<h1>Form Here</h1>
	}
}

export default LoginPage;
