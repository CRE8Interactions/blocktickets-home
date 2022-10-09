import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { isMatching } from '../../utilities/helpers';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { PasswordInput } from "../PasswordInput";
import { Error } from '../Error'
import { SuccessContainer } from '../SuccessContainer';

export default function ForgotPasswordWrapper() {

    const navigate = useNavigate();
    const inputEl = useRef();

    const [step, setStep] = useState(1)

    const [credentials, setCredentials] = useState({
        identifier: '',
        password: ''
    })

    const [isValid, setIsValid] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (!isValid)
            setIsValid(true)

    }, [credentials.password])

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleStep = () => {
        setStep(step + 1)
    }

    const send = () => {
        handleStep()
    }

    const submit = () => {
        if (!isMatching(credentials.password, inputEl.current.value)) {
            setIsValid(false)
        } else {
            setIsSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }
    }

    const getSubtitle = () => {
        if (step === 1) {
            return 'Please enter the email address associated with your account and we will send you a link to reset your password.'
        } else {
            return 'Enter a new, secure password that you will use to log in to your account.'
        }
    }

    return (
        <section className='wrapper-xs'>
            {(step == 1 || step == 2 && !isSuccess) && (
                <>
                    <header className='mb-5'>
                        <h1 className='fs-md'>Password reset</h1>
                        <h2 className='text-muted normal fw-normal'>{getSubtitle()}</h2>
                    </header>
                    <Form>
                        {step === 1 && (
                            <>
                                <Form.Group className='form-group' controlId="identifier">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="identifier"
                                        placeholder="e.g mail@example.com"
                                        value={credentials.identifier}
                                        onChange={handleCredentials}
                                        required
                                        className={`${!isValid ? 'error-border' : ''}`}
                                    />
                                </Form.Group>
                                <Button size="lg" className='mt-4 w-100 btn-next' disabled={credentials.identifier === ''} onClick={send}>Send reset link</Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Form.Group className='form-group' controlId="password">
                                    <Form.Label>Create a password</Form.Label>
                                    <PasswordInput value={credentials.password} isValid={isValid} handlePassword={handleCredentials} />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="repeatPassword">
                                    <Form.Label>Repeat password</Form.Label>
                                    <PasswordInput placeholder="Confirm password" isValid={isValid} reference={inputEl} />
                                </Form.Group>
                                {!isValid && (
                                    <Error type="match" />
                                )}
                                <Button size="lg" className='mt-4 w-100' disabled={credentials.password === ''} onClick={submit}>Reset password</Button>
                            </>
                        )}
                    </Form>
                </>
            )}
            {isSuccess && (
                <SuccessContainer>
                    <h1 className='heading'>Password changed successfully!</h1>
                    <p className='text-muted'>Redirecting you to login...</p>
                </SuccessContainer>
            )}
        </section>
    )
}
