import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { inviteValid, register, addMember } from '../../utilities/api';

import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { PasswordInput } from '../PasswordInput';
import { Error } from '../Error'
import { Spinner } from '../Spinner'

export default function RegisterWrapper() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [hasError, setHasError] = useState(false);
  const [valid, setValid] = useState(false)
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

}, [credentials.identifier, credentials.password])

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
        setAlert({
          error: true,
          message: 'Invalid invite code'
        })
      })
  }, [code])

  useEffect(() => {
    if (credentials.email && credentials.firstName && credentials.lastName && credentials.password && credentials.password.split('').length >= 6) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [credentials])

  useEffect(() => {
    
  }, [valid])

  const submit = () => {
    register(credentials)
      .then((res) => {
        let user = res.data.user;
        let data = {
          user,
          invite
        }
        addMember({data})
          .then((res) => {
            setComplete(true)
          })
          .catch((err) => console.error(err))

      })
      .catch((err) => {
          console.error(err)
      })
  }

  return (
    <section className='wrapper-xs'>
            <>
            { alert && alert.error &&
              <Alert key="danger" variant="danger">
                {alert?.message}
              </Alert>
            }
            </>
            <br />
            <header className='mb-5'>
                <h1 className='fs-md'>Team Member Registration</h1>
                <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
            </header>
            {!complete &&
              <>
              <Form>
                <Form.Group className='form-group'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        disabled={true}
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
                        value={credentials.firstName}
                        onChange={handleCredentials}
                        className={`${!isValid ? 'error-border' : ''}`}
                    />
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        required
                        value={credentials.lastName}
                        onChange={handleCredentials}
                        className={`${!isValid ? 'error-border' : ''}`}
                    />
                </Form.Group>
                <Form.Group className='form-group' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <PasswordInput value={credentials.password} isValid={true} handlePassword={handleCredentials} />
                </Form.Group>
                {!isValid && (
                    <Error type="login" />
                )}
                <Button size="lg" className={`mt-4 w-100 ${!isSaving ? 'btn-next' : ''} `} disabled={!valid} onClick={submit}>
                    {isSaving ? (
                        <Spinner />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </Form>
              </>
            }
            {complete &&
              <>
                <h2>Registration Complete you can login</h2>
              </>
            }
        </section>
  )
}