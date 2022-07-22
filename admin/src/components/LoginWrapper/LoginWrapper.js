import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { EyeIcon } from "./../EyeIcon";
import { EyeIconSlash } from "./../EyeIconSlash";

export default function LoginWrapper() {

    const [show, setShow] = useState(false)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [emailExists, setEmailExists] = useState(false)

    const [passwordExists, setPasswordExists] = useState(false)

    const handleToggle = (e) => {
        setShow(!show);
    }

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <section className='wrapper-xs'>
            <Card body>
                <header className='mb-5'>
                    <h1 className='fs-md'>Log in as organization</h1>
                    <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
                </header>
                <Form>
                    <Form.Group className='form-group' controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="e.g mail@example.com"
                            value={credentials.email}
                            onChange={handleCredentials}
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="password">
                        <Form.Label>Password</Form.Label>
                        <div className='input-wrapper'>
                            <Form.Control
                                type={show ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleCredentials}
                            />

                            <Button variant="link" onClick={handleToggle}>

                                {show ? (
                                    <EyeIconSlash />
                                ) : (
                                    <EyeIcon />
                                )}
                            </Button>
                        </div>
                        <Stack direction='horizontal'>
                            <Link to="" className='mt-2 ms-auto caption'>Forgot password?</Link>
                        </Stack>
                    </Form.Group>
                    <Button size="lg" className='mt-4 w-100 btn-next'>Next</Button>
                </Form>
            </Card>
        </section >
    )
}
