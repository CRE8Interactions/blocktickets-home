import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { inviteValid, register } from '../../utilities/api';

import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { PasswordInput } from '../PasswordInput';
import { Error } from '../Error'
import { Spinner } from '../Spinner'

export default function RegisterWrapper() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [hasError, setHasError] = useState(false);

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

}, [credentials.identifier, credentials.password])

const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  useEffect(() => {
    inviteValid(code)
      .then((res) => {
        console.log(res);
        if (res.data) setCredentials({
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName
        })
      })
      .catch((err) => console.error(err))
  }, [code])

  const submit = () => {
    console.log('Credentials ', credentials)
  }

  return (
    <section className='wrapper-xs'>
            <header className='mb-5'>
                <h1 className='fs-md'>Team Member Registration</h1>
                <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
            </header>
            <Form>
                <Form.Group className='form-group'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        disabled="true"
                        name="email"
                        required
                        value={credentials.email}
                        onChange={handleCredentials}
                        className={`${!isValid ? 'error-border' : ''}`}
                    />
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        required
                        value={credentials.firstName}
                        onChange={handleCredentials}
                        className={`${!isValid ? 'error-border' : ''}`}
                    />
                </Form.Group>
                <Form.Group className='form-group' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <PasswordInput value={credentials.password} isValid={isValid} handlePassword={handleCredentials} />
                    <Stack direction='horizontal'>
                        <Link to="forgot-password" className='mt-2 ms-auto caption'>Forgot password?</Link>
                    </Stack>
                </Form.Group>
                {!isValid && (
                    <Error type="login" />
                )}
                <Button size="lg" className={`mt-4 w-100 ${!isSaving ? 'btn-next' : ''} `} disabled={credentials.identifier === '' || credentials.password === ''} onClick={submit}>
                    {isSaving ? (
                        <Spinner />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </Form>
            <div className="text-center mt-4 caption">
                <span className='text-muted'>Don't have an account yet? <Link to="/signup">Signup</Link></span>
            </div>
        </section>
  )
}