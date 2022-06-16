import React, { Fragment, useState, useEffect } from 'react';

import { isValidPhoneNumber } from 'react-phone-number-input';

import { PhoneNumberInput } from '../../PhoneNumberInput';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginSecurityForm() {
    const [
        formValid,
        setFormValid
    ] = useState(false);

    const [
        code,
        setCode
    ] = useState('');

    const [
        newPhoneNumber
    ] = useState();

    const [
        phoneNumber,
        setValue
    ] = useState('');

    const [isValid, setIsValid] = useState(true);

    useEffect(
        () => {
            if (phoneNumber && newPhoneNumber && code) {
                setFormValid(true);
            }
        },
        [
            phoneNumber,
            newPhoneNumber,
            code
        ]
    );

    // reset error when inputs are changed
    useEffect(
        () => {
            setIsValid(true);
        },
        [
            phoneNumber,
            code
        ]
    );

    const validNumber = () => {
        return phoneNumber && isValidPhoneNumber(phoneNumber)
    }

    const handleBlur = () => {
        if (validNumber()) {
            setIsValid(true)
        } else { setIsValid(false) }
    }

    const submitForm = () => {
        let data = {
            data: {
                phoneNumber,
                newPhoneNumber
            }
        };
    };

    function verifyUserCode(code) {
        let data = {
            data: {
                code
            }
        };
        verifiyCode(data)
            .then((res) => {
                if (res.status === 200) {
                    setAuthenticated(res.data);
                }
            })
            .catch((err) => {
                setHasError(true);
                console.error(err);
            });
    }

    return (
        <Fragment>
            <Form className="d-flex-column" id="login-security-form">

                <Form.Group className='form-group' controlId="new-phone-number">
                    <Form.Label>New Phone Number</Form.Label>
                    <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setValue} hasError={!isValid} onBlur={handleBlur} />
                </Form.Group>

                <Form.Group className="form-group" controlId="code">
                    <Form.Label>Verify Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the 4 digit code"
                        required
                        name="code"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Form.Text className="d-block mt-2">
                        A 4-digit code should have been sent to you using the new phone number specified above.
                    </Form.Text>
                </Form.Group>
                <Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
                    Update
                </Button>
            </Form>
        </Fragment>
    );
}
