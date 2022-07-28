import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AuthService from '../../utilities/services/auth.service'
import { login } from '../../utilities/api'
import { isMatching } from '../../utilities/helpers'
import UserContext from '../../context/User/User'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { BackButton } from '../BackButton';
import { PasswordInput } from '../PasswordInput';
import { PasswordInputWrapper } from "../PasswordInputWrapper";
import { Error } from '../Error'
import { OrganizationInformation } from '../OrganizationInformation';
import { Roles } from "../Roles";
import { Team } from "../Team";
import { BankAccountDetails } from "./../BankAccountDetails";
import { TaxStatus } from "../TaxStatus";
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';

import './signUpWrapper.scss'

export default function SignUpWrapper() {

    const { setAuthenticated } = useContext(UserContext);

    const inputEl = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // demo purposes: will come from database - delete later
    const roles = ['master_admin', 'admin', 'marketer', 'viewer']

    // demo purposes: will come from database - delete later 
    const members = [
        {
            name: 'harrison_cogan',
            role: 'master_admin',
        },
        {
            name: 'chaz_haskins',
            role: 'viewer',
        },
        {
            name: 'florenc_sinanaj',
            role: 'marketer',
        },
        {
            name: 'jaime_convery',
            role: 'admin',
        }
    ]

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        identifier: '',
        password: ''
    })

    const [orgInfo, setOrgInfo] = useState()

    const [taxDetails, setTaxDetails] = useState()

    const [bankAccount, setBankAccount] = useState()

    const [step, setStep] = useState(1)

    const [taxStep, setTaxStep] = useState()

    const [isValid, setIsValid] = useState(true)

    const [formValid, setFormValid] = useState(true)

    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])

    useEffect(() => {

        if (!isValid)
            setIsValid(true)

    }, [credentials.password, bankAccount?.accountNumber])

    const getTitle = () => {
        switch (step) {
            case 1:
                return 'Organizer sign up'

            case 2:
                return 'Organization information'

            case 3:
                return 'Team management'

            case 4:
                return 'Payment information'

            case 5:
                return 'Tax Status'

            default:
                return;
        }
    }
    const getSubtitle = () => {
        switch (step) {
            case 1:
                return 'The future of ticketing is here'

            case 2:
                return 'Details that apply across your events'

            case 3:
                return 'Manage your team members and their roles'

            case 4:
                return 'The money you make from your events will be issued to the bank account associated with this account'

            case 5:
                return 'Fill out a W-9 form in order to receive your funds'

            default:
                return;
        }
    }

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleStep = (curStep, setter) => {
        setter(curStep + 1)
    }

    const handleGoBack = () => {
        if ((taxStep > 1 && taxStep < 3)) {
            setTaxStep(taxStep - 1)
        } else {
            setStep(step - 1)
        }
        if (taxStep === 1) {
            setTaxStep(undefined)
        }
    }

    const handleNext = () => {
        let curStep;
        let setter;
        if (taxStep >= 1 && taxStep < 3) {
            curStep = taxStep;
            setter = setTaxStep;
        } else {
            curStep = step;
            setter = setStep;
        }

        if (step === 1) {
            if (!isMatching(credentials.password, inputEl.current.value)) {
                setIsValid(false)
            } else {
                handleStep(curStep, setter)
            }
        }
        else if (step === 5 && taxStep === 3) {
            setIsSuccess(true)
        }
        else {
            handleStep(curStep, setter);
        }
    }

    const submit = () => {
        if (isValid) {
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
                .catch((err) => {
                    setIsValid(false)
                    console.error(err)
                })
        }
    }

    return (
        <section id="sign-up-wrapper">
            {!isSuccess && (
                <Row>
                    <Col md={4}>
                        {step > 1 && (
                            <BackButton handleGoBack={handleGoBack} />
                        )}
                    </Col>
                    <Col md={4}>
                        <ol className="stepper mb-5">
                            <li className={`stepper-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            </li>
                            <li className={`stepper-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            </li>
                            <li className={`stepper-item ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                            </li>
                            <li className={`stepper-item ${step === 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
                            </li>
                            <li className={`stepper-item ${step === 5 ? 'active' : ''}`}>
                            </li>
                        </ol>
                        <header className='mb-5'>
                            <h1 className={`${step !== 1 ? 'text-upper' : 'fs-md'}`}>{getTitle()}</h1>
                            <h2 className='text-muted normal fw-medium'>{getSubtitle()}</h2>
                        </header>
                        {step === 1 && (
                            <Form>
                                <Form.Group className='form-group' controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="e.g John"
                                        value={credentials.firstName}
                                        onChange={handleCredentials}
                                    />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        required
                                        placeholder="e.g Doe"
                                        value={credentials.lastName}
                                        onChange={handleCredentials}
                                    />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="identifier">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="identifier"
                                        required
                                        placeholder="e.g mail@example.com"
                                        value={credentials.identifier}
                                        onChange={handleCredentials}
                                    />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="password">
                                    <Form.Label>Create a Password</Form.Label>
                                    <PasswordInputWrapper value={credentials.password} isValid={isValid} handlePassword={handleCredentials} />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="repeatPassword">
                                    <Form.Label>Repeat password</Form.Label>
                                    <PasswordInput placeholder="Confirm password" isValid={isValid} reference={inputEl} />
                                </Form.Group>
                                {!isValid && (
                                    <Error type="match" />
                                )}
                            </Form>
                        )}
                        {step === 2 && (
                            <OrganizationInformation getOrgInfo={setOrgInfo} />
                        )}
                        {step === 3 && (
                            <>
                                <Roles roles={roles} />
                                <Team members={members} />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <h1 className='normal'>Bank information</h1>
                                <div className="seperator">
                                    <Form>
                                        <BankAccountDetails getBankAccount={setBankAccount} isValid={isValid} setIsValid={setIsValid} />
                                    </Form>
                                </div>

                            </>
                        )}
                        {step === 5 && !isSuccess && (
                            <TaxStatus step={taxStep} setStep={setTaxStep} getTaxDetails={setTaxDetails} />
                        )}

                        {!isSuccess && (
                            <Button size="lg" className='mt-4 w-100 btn-next' disabled={!formValid} onClick={handleNext}>{taxStep === 3 ? 'Create' : 'Next'}</Button>
                        )}

                        {step === 1 && (
                            <div className="text-center mt-4 caption">
                                <span className='text-muted'>Already have an account? <Link to="/login">Log in</Link></span>
                            </div>
                        )}
                    </Col>
                </Row>
            )}

            {isSuccess && (
                <div className='wrapper-xs'>
                    <SuccessContainer>
                        <h1 className='heading'>Your account has been successfully created!</h1>
                        <SuccessDisclaimer />
                        <Link to="/myevent/123" className="btn btn-primary btn-next btn-lg w-100">Go to creator panel</Link>
                    </SuccessContainer>
                </div>
            )}
        </section>
    )
}
