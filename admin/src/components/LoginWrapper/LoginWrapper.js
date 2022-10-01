import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AuthService from '../../utilities/services/auth.service'
import { login, getMyOrganizations, getMyPermissions } from '../../utilities/api'
import UserContext from '../../context/User/User';

import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { PasswordInput } from '../PasswordInput';
import { Error } from '../Error'
import { Spinner } from '../Spinner'

export default function LoginWrapper() {

    const { setAuthenticated, setOrganization } = useContext(UserContext);
    const { setUser, setPermissions, setOrg } = AuthService;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [credentials, setCredentials] = useState({
        identifier: '',
        password: ''
    })

    const [isValid, setIsValid] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (!isValid)
            setIsValid(true)

    }, [credentials.identifier, credentials.password])

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const submit = () => {
        if (isValid) {
            setIsSaving(true)
            login(credentials)
                .then((res) => {
                    setUser(res.data);
                    setAuthenticated(res.data);
                    setIsSaving(false)
                })
                .then(() => {
                    getMyOrganizations()
                        .then((res) => {
                            if (res.data.length > 0) {
                                setOrg(res.data)
                                setOrganization(res.data)
                            } else {
                                // navigate('/signup', { replace: true })
                                console.error('No Org Present')
                            }
                        })
                        .catch((err) => console.error(err))
                })
                .then(() => {
                    getMyPermissions()
                        .then((res) => {
                            setPermissions(res?.data?.organization_role)
                            // Send them back to the page they tried to visit when they were
                            // redirected to the login page. Use { replace: true } so we don't create
                            // another entry in the history stack for the login page.  This means that
                            // when they get to the protected page and click the back button, they
                            // won't end up back on the login page, which is also really nice for the
                            // user experience.
                            navigate(from, { replace: true });
                            setIsSaving(false)
                        })
                        .catch((err) => console.error(err))

                }, [])
                .catch((err) => {
                    setIsValid(false)
                    setIsSaving(false)
                    console.error(err)
                })
        }
    }

    return (
        <section className='wrapper-xs'>
            <header className='mb-5'>
                <h1 className='fs-md'>Organizer login</h1>
                <h2 className='text-muted normal fw-medium'>The future of ticketing is here</h2>
            </header>
            <Form>
                <Form.Group className='form-group' controlId="identifier">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="identifier"
                        required
                        placeholder="e.g mail@example.com"
                        value={credentials.identifier}
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
                        'Login'
                    )}
                </Button>
            </Form>
            <div className="text-center mt-4 caption">
                <span className='text-muted'>Don't have an account yet? <Link to="/signup">Signup</Link></span>
            </div>
        </section>
    )
}
