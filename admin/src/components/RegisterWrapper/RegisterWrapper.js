import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

import { inviteValid, register, addMember } from '../../utilities/api';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { PasswordInput } from '../PasswordInput';
import { Error } from '../Error'
import { SuccessContainer } from '../SuccessContainer';
import { Spinner } from '../Spinner'

export default function RegisterWrapper() {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    const navigate = useNavigate();
    const passwordEl = useRef();

    const [alert, setAlert] = useState({
        error: false,
        message: ''
    })

    const [invite, setInvite] = useState({
        inviteCode: '',
        organization: {},
        organization_role: {}
    })

    const [complete, setComplete] = useState(false)

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [isValid, setIsValid] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (!isValid)
            setIsValid(true)

    }, [credentials.firstName, credentials.lastName, credentials.email, credentials.password])

    useEffect(() => {
        if (complete) {
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }
    }, [complete])

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        inviteValid(code)
            .then((res) => {
                setCredentials({
                    email: res.data.email,
                    username: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                })
                setInvite(res.data)
            })
            .catch((err) => {
                window.scroll(0, 0)
                setAlert({
                    error: true,
                    message: 'Invalid invite code'
                })
            })
    }, [code])

    const handleValid = () => {
        if (!passwordEl.current.validity.valid) {
            setIsValid(false)
        }
    }

    const submit = () => {
        if (isValid) {
            setIsSaving(true)
            register(credentials)
                .then((res) => {
                    let user = res.data.user;
                    let data = {
                        user,
                        invite
                    }
                    addMember({ data })
                        .then((res) => {
                            setComplete(true)
                            setIsSaving(false)
                        })
                        .catch((err) => {
                            console.error(err);
                            setIsSaving(false)
                        })

                })
                .catch((err) => {
                    console.error(err);
                    setIsSaving(false)
                })
        }
    }

    return (
        <section className='wrapper-xs'>
            <>
                {alert && alert.error &&
                    <Alert key="danger" variant="danger">
                        {alert?.message}
                    </Alert>
                }
            </>
            <br />
            {!complete && (
                <>
                    <header className='mb-5'>
                        <h1 className='fs-md'>Team Member Registration</h1>
                        <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
                    </header>
                    <Form>
                        <Form.Group className='form-group'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                disabled
                                name="email"
                                required
                                value={credentials.email}
                                onChange={handleCredentials}
                            />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                required
                                placeholder="Enter your first name"
                                value={credentials.firstName}
                                onChange={handleCredentials}
                            />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                required
                                placeholder="Enter your last name"
                                value={credentials.lastName}
                                onChange={handleCredentials}
                            />
                        </Form.Group>
                        <Form.Group className='form-group' controlId="password">
                            <Form.Label>Password</Form.Label>
                            <PasswordInput value={credentials.password} reference={passwordEl} isValid={isValid} handlePassword={handleCredentials}
                                onBlur={handleValid}
                            />
                        </Form.Group>
                        {!isValid && (
                            <Error type="patternMatch" />
                        )}
                        <Button size="lg" className={`mt-4 w-100 ${!isSaving ? 'btn-next' : ''} `} disabled={!credentials.firstName || !credentials.lastName || !credentials.password || !isValid} onClick={submit}>
                            {isSaving ? (
                                <Spinner />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Form>
                </>
            )}
            {complete &&
                <SuccessContainer>
                    <h1 className='heading'>Your account has been successfully created!</h1>
                    <p className='text-muted fw-medium'>Redirecting to login...</p>
                </SuccessContainer>
            }
        </section>
    )
}