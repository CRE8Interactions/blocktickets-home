import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

import { Error } from '../Error';

import 'react-phone-number-input/style.css';

export default function PhoneNumberInput({ phoneNumber, setPhoneNumber, onBlur, hasError }) {

    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        axios
            .get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
            .then((res) => setCountryCode(res.data.country_code));
    }, []);

    return (
        <>
            <PhoneInput
                autoComplete={'off'}
                defaultCountry={countryCode}
                value={phoneNumber}
                required
                onChange={setPhoneNumber}
                onBlur={onBlur && onBlur}
                className={phoneNumber && hasError ? 'error-border' : ''}
            />
            {phoneNumber && hasError && (<Error type="phone" />)}
        </>
    );
}
