import React, { useState, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import AuthService from '../../utilities/services/auth.service'
import UserContext from '../../context/User/User'

import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { EyeIcon } from "./../EyeIcon";
import { EyeIconSlash } from "./../EyeIconSlash";
import { login } from '../../utilities/api'

export default function LoginWrapper() {

    const [show, setShow] = useState(false)

    const [credentials, setCredentials] = useState({
        identifier: '',
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

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const submit = () => {
        login(credentials)
            .then((res) => {
                AuthService.setUser(res.data);
                setAuthenticated(res.data);
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from, { replace: true }); 
            })
            .catch((err) => console.error(err))
        
    }
    const { setAuthenticated } = useContext(UserContext);

    return (
        <section className='wrapper-xs'>
            <Card body>
                <header className='mb-5'>
                    <h1 className='fs-md'>Log in as organization</h1>
                    <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
                </header>
                <Form>
                    <Form.Group className='form-group' controlId="identifier">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="identifier"
                            placeholder="e.g mail@example.com"
                            value={credentials.identifier}
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
                    <Button size="lg" className='mt-4 w-100 btn-next' onClick={() => submit()}>Login</Button>
                </Form>
            </Card>
        </section >
    )
}
