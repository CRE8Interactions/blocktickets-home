import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { isValidPhoneNumber } from 'react-phone-number-input';

import { verifyUser, verifiyCode, createNewUser, validEmail } from '../../utilities/api';
import AuthService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { PhoneNumberInput } from './../PhoneNumberInput';
import { Error } from '../Error';
import { BackButton } from './../BackButton';

import './loginSignupForm.scss';

export default function LoginSignupForm() {
    const [
        step,
        setStep
    ] = useState(0);

    const [choice, setChoice] = useState('phone-number');

    const [
        code,
        setCode
    ] = useState('');

    const [
        hasError,
        setHasError
    ] = useState(false);

    const [
        phoneNumber,
        setValue
    ] = useState();

    const [
        formValid,
        setFormValid
    ] = useState(false);

    const [
        firstName,
        setFirstName
    ] = useState('');

    const [
        lastName,
        setLastName
    ] = useState('');

    const [
        email,
        setEmail
    ] = useState('');

    const [
        dob,
        setDob
    ] = useState('');
    const [
        gender,
        setGender
    ] = useState('');

    const { setAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // reset error when inputs are changed
    useEffect(
        () => {
            setHasError(false);
        },
        [
            phoneNumber,
            email,
            code
        ]
    );

    const handleGoBack = () => {
        let curStep = step;
        setStep(--curStep);
    };

    const validNumber = () => {
        return phoneNumber && isValidPhoneNumber(phoneNumber)
    }

    useEffect(
        () => {
            if (firstName && lastName && email && gender && dob) {
                setFormValid(true);
            }
        },
        [
            firstName,
            lastName,
            email,
            dob,
            gender
        ]
    );

    function setVal(e) {
        const num1 = document.getElementById('num1');
        const num2 = document.getElementById('num2');
        const num3 = document.getElementById('num3');
        const num4 = document.getElementById('num4');

        if (num1.value) num2.focus();
        if (num1.value && num2.value) num3.focus();
        if (num1.value && num2.value && num3.value) num4.focus();
        if (num1.value && num2.value && num3.value && num4.value) {
            const code = Number(`${num1.value}${num2.value}${num3.value}${num4.value}`);
            setCode(code);
            verifyUserCode(code);
        }
    }

    // submit phoneNumber
    function submit() {
        if ((validNumber() || email) && !hasError) {
            let data = {
                data: {
                    phoneNumber,
                    email
                }
            };
            verifyUser(data)
                .then((res) => {
                    setStep(1);
                })
                .catch((err) => {
                    setHasError(true);
                    console.error(err);
                });
        } else {
            setHasError(true)
        }
    }

    function verifyUserCode(code) {
        let data = {
            data: {
                code
            }
        };
        verifiyCode(data)
            .then((res) => {
                if (res.status === 200) {
                    AuthService.setUser(res.data);
                    setAuthenticated(res.data);
                    // Send them back to the page they tried to visit when they were
                    // redirected to the login page. Use { replace: true } so we don't create
                    // another entry in the history stack for the login page.  This means that
                    // when they get to the protected page and click the back button, they
                    // won't end up back on the login page, which is also really nice for the
                    // user experience.
                    navigate(from, { replace: true });
                }
                else if (res.status === 203) {
                    setStep(2);
                }
            })
            .catch((err) => {
                setHasError(true);
                console.error(err);
            });
    }

    const submitForm = () => {
        let data = {
            data: {
                dob,
                email,
                firstName,
                lastName,
                gender,
                phoneNumber
            }
        };
        createNewUser(data).then((res) => {
            if (res.status === 200) {
                AuthService.setUser(res.data);
                navigate('/');
            }
        });
    };

    const validateEmail = () => {
        let data = {
            data: {
                email
            }
        }
        validEmail(data).then(res => {
            if (res.data === 404) setHasError(true)
            if (res.data === 200) setHasError(false)
        }).catch((err) => console.error(err))
    }

    const submitEmailRequest = (e) => {
        submit()
    }

    return (
        <Row className="spacer-md" id="login-signup-container">
            <Col md={4}>{step > 0 && <BackButton handleGoBack={handleGoBack} />}</Col>
            <Col md={6} className="form-container d-flex-column">
                {step === 0 && (
                    <Fragment>
                        <div className="heading">
                            <h1 className="fs-md">Log in</h1>
                            <h2 className="normal text-muted fw-normal m-0">
                                The future of ticketing is here
                            </h2>
                        </div>
                        {choice == 'phone-number' ? (
                            <>
                                <div className="step-desc">
                                    <h3 className="title">Verify your mobile number</h3>
                                    <h4 className="subtitle">
                                        Select your country and enter your mobile number. You'll receive an
                                        access code via text message. If you don’t have an account, we will
                                        automatically create one for you.
                                    </h4>
                                </div>
                                <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setValue} hasError={hasError} />
                                <Button
                                    size="lg"
                                    className="icon-button btn-next"
                                    disabled={!phoneNumber || hasError}
                                    onClick={(e) => submit()}>
                                    Validate
                                </Button>
                                <Form.Text><p>Don't have access to your phone?</p> <p><Button variant="link" onClick={() => setChoice('email')}>Click here</Button> to use your email to log in.</p></Form.Text>
                            </>
                        ) : (
                            <>
                                <div className="step-desc">
                                    <h3 className="title">Verify your email address</h3>
                                    <h4 className="subtitle">
                                        Please enter your email below and we will send you the security code there.
                                    </h4>
                                </div>
                                <Form.Group className="form-group" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={(e) => validateEmail()}
                                        className={email && hasError ? 'error-border' : ''}
                                    />
                                </Form.Group>
                                {email && hasError && <Error type="email" />}

                                <Button
                                    size="lg"
                                    className="icon-button btn-next"
                                    disabled={!email || hasError}
                                    onClick={(e) => submitEmailRequest(e)}>
                                    Send
                                </Button>
                            </>
                        )}
                    </Fragment>
                )}
                {step === 1 && (
                    <Fragment>
                        <div className="heading">
                            <h3 className="title mb-1">Enter 4 Digit Verification</h3>
                            <p className="subtitle">
                                Code is set to <span className="text-primary">{phoneNumber ? phoneNumber : email}</span>
                            </p>
                        </div>
                        <Form.Group>
                            <Form.Label>Enter Code</Form.Label>
                            <Stack direction="horizontal" gap={3}>
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    maxLength="1"
                                    id="num1"
                                    pattern="^0[1-9]|[1-9]\d$"
                                    required
                                    onChange={(e) => setVal(e)}
                                    className={hasError && 'error-border'}
                                />

                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    maxLength="1"
                                    id="num2"
                                    pattern="^0[1-9]|[1-9]\d$"
                                    required
                                    onChange={(e) => setVal(e)}
                                    className={hasError && 'error-border'}
                                />

                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    maxLength="1"
                                    id="num3"
                                    pattern="^0[1-9]|[1-9]\d$"
                                    required
                                    onChange={(e) => setVal(e)}
                                    className={hasError && 'error-border'}
                                />

                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    maxLength="1"
                                    id="num4"
                                    pattern="^0[1-9]|[1-9]\d$"
                                    required
                                    onChange={(e) => setVal(e)}
                                    className={hasError && 'error-border'}
                                />
                            </Stack>
                        </Form.Group>
                        {hasError && <Error type="code" />}
                        <Form.Text>
                            Did not recieve code? <Button variant="link">Resend Code</Button>
                        </Form.Text>
                    </Fragment>
                )}
                {step === 2 && (
                    <Fragment>
                        <div className="heading">
                            <h1 className="title">Let's Set Up your Profile</h1>
                        </div>
                        <Form className="d-flex-column">
                            <Form.Group className="form-group" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="form-group" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    required
                                    name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your last name"
                                    required
                                    name="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Row className="form-group">
                                <Col>
                                    <Form.Group className="form-group" controlId="dob">
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            required
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="form-group" controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            required
                                            onChange={(e) => setGender(e.target.value)}>
                                            <option>Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {hasError && <Error />}
                            <Form.Group className="form-group fw-semi-bold" controlId="upcoming-events">
                                <Form.Check type="checkbox" label="Opt out of receiving emails and texts for our upcoming events" className='mt-2' />
                            </Form.Group>
                            <Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
                                Sign up
                            </Button>
                        </Form>
                    </Fragment>
                )}
            </Col>
        </Row>
    );
}
