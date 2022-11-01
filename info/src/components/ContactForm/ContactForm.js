import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

import { isValidPhoneNumber } from 'react-phone-number-input';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Error } from '../Error'

import 'react-phone-number-input/style.css';

export default function ContactForm() {

    const volumeOptions = [
        {
            label: '10k or less',
            value: '>=10k'
        },
        {
            label: '50k or less',
            value: '>=50k'
        },
        {
            label: '100k or less',
            value: '>=100k'
        },
        {
            label: '100k or more',
            value: '<=100k'
        },
    ]

    const [countryCode, setCountryCode] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('')

    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        axios
            .get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
            .then((res) => setCountryCode(res.data.country_code));
    }, []);

    useEffect(() => {
        if (hasError) {
            setHasError(false)
        }
    }, [phoneNumber])

    const validNumber = () => {
        setHasError(phoneNumber && !isValidPhoneNumber(phoneNumber))
    }

    return (
        <Card body className='contact-form'>
            <Form>
                <Form.Group className='form-group' controlId="fullName">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        required
                        placeholder="Enter your full name"
                    />
                </Form.Group>
                <Form.Group className='form-group' controlId="phoneNumber">
                    <Form.Label>
                        Phone number
                    </Form.Label>
                    <PhoneInput
                        autoComplete={'off'}
                        defaultCountry={countryCode}
                        value={phoneNumber}
                        required
                        onChange={setPhoneNumber}
                        onBlur={validNumber}
                        className={phoneNumber && hasError ? 'error-border' : ''}
                    />
                    {phoneNumber && hasError && (<Error type="phone" />)}
                </Form.Group>
                <Form.Group className='form-group' controlId="org">
                    <Form.Label>
                        Organization
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="org"
                        required
                        placeholder="Enter your organization"
                    />
                </Form.Group>
                <Form.Group className='form-group' controlId="ticketVolume">
                    <Form.Label>
                        Annual ticket volume
                    </Form.Label>

                    <Form.Select>
                        {volumeOptions.map((opt, index) => (
                            <option value={opt.value} key={index}>{opt.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className='form-group' controlId="interest">
                    <Form.Label>
                        What interested you about Blocktickets? (Optional)
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="interest"
                    />
                </Form.Group>
                <Button variant="secondary" size="lg" className="mt-4 w-100" type="submit">
                    Request a demo
                </Button>
            </Form>
        </Card>
    )
}
