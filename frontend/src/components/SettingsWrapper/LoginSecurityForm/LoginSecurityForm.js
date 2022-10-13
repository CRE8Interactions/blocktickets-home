import React, { Fragment, useState, useEffect } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import authService from '../../../utilities/services/auth.service';
import { requestNumberChange, updateNumber, phoneUnique } from '../../../utilities/api';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PhoneNumberInput } from '../../PhoneNumberInput';
import { Spinner } from "../../SpinnerContainer/Spinner"

export default function LoginSecurityForm({ user, setShow, showError, setPhone }) {
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
    const [verifying, setVerifying] = useState(false);
    const [updated, setUpdated] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

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
        return phoneNumber && isValidPhoneNumber(phoneNumber) && isValid
    }

    const handleBlur = () => {
        let data = {
            data: {
                phoneNumber
            }
        };
        phoneUnique(data).then(res => {
            if (res.data === 404) { setIsValid(false) }
            if (res.data === 200) { setIsValid(true) }
        }).catch(err => console.error(err))
    }

    const submitForm = () => {
        setIsSaving(true)
        let data = {
            data: {
                toNumber: phoneNumber,
                fromNumber: user.phoneNumber
            }
        };
        requestNumberChange(data).then((res) => {
            setIsSaving(false);
            setShow(true);
            setVerifying(true)
        }).catch((err) => {
            setIsSaving(false)
            console.error(err)
        })
    };

    const submitCode = (code) => {
        const length = code.split('').length;

        let data = {
            data: {
                code
            }
        };
        if (length === 4) {
            updateNumber(data).then((res) => { setShow(false); authService.setUser(res.data); showError(false); setPhone(phoneNumber); setUpdated(true) }).catch((err) => { console.error(err); showError(true) })
        }
    }

    return (
        <Fragment>
            <Form className="d-flex-column" id="login-security-form">

                <Form.Group className='form-group' controlId="new-phone-number">
                    <Form.Label>New Phone Number</Form.Label>
                    <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setValue} hasError={!isValid} onBlur={handleBlur} disabled={updated} />
                </Form.Group>
                {!updated &&
                    <Form.Group className="form-group" controlId="code">
                        <Form.Label>Verify Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the 4 digit code"
                            required
                            name="code"
                            maxLength="4"
                            onChange={(e) => { setCode(e.target.value); submitCode(e.target.value) }}
                        />
                        <Form.Text className="d-block mt-2">
                            A 4-digit code should have been sent to you using the new phone number specified above.
                        </Form.Text>
                    </Form.Group>
                }
                {!verifying &&
                    <Button disabled={!validNumber()} className="icon-button" size="lg" onClick={submitForm}>
                        {isSaving ? (
                            <Spinner />
                        ) : (
                            'Update'
                        )}
                    </Button>
                }
            </Form>
        </Fragment>
    );
}
