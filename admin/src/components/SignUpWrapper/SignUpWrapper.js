import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AuthService from '../../utilities/services/auth.service'
import {
    signUp, createOrganization, getOrganizationRoles, getOrganizationPermissions,
    createOrEditRole, getTeam, createOrEditMember, createPaymentInfo, createW9, register
} from '../../utilities/api'
import { isMatching, formatPermissions, formatMembers } from '../../utilities/helpers'
import UserContext from '../../context/User/User'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { BackButton } from '../BackButton';
import { PasswordInput } from '../PasswordInput';
import { PasswordInputWrapper } from "../PasswordInputWrapper";
import { Error } from '../Error'
import { OrganizationInformationWrapper } from '../OrganizationInformationWrapper';
import { Roles } from "../Roles";
import { Team } from "../Team";
import { BankAccountDetailsWrapper } from "./../BankAccountDetailsWrapper";
import { TaxWrapper } from "../TaxWrapper";
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';

import './signUpWrapper.scss'

export default function SignUpWrapper() {

    const { setAuthenticated } = useContext(UserContext);

    const inputEl = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [orgInfo, setOrgInfo] = useState()

    const [taxDetails, setTaxDetails] = useState()

    const [bankAccount, setBankAccount] = useState({})

    const [step, setStep] = useState(1)

    const [taxStep, setTaxStep] = useState()

    const [isValid, setIsValid] = useState(true)

    const [error, setError] = useState({})

    const [formValid, setFormValid] = useState(true)

    const [isSuccess, setIsSuccess] = useState(false)

    const [roles, setRoles] = useState([])
    const [permissions, setPermissions] = useState([])
    const [members, setMembers] = useState([])
    const [company, setCompany] = useState()

    const createRoles = (data) => {
        createOrEditRole({ data })
            .then((res) => setRoles(res.data))
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        // Get Roles and Permissions if refresh browser on step 3
        if (step === 3 && roles.length === 0) getRolesAndPermissions()
    }, [step, taxStep])


    useEffect(() => {
        setError({})
        setIsValid(true)
    }, [credentials.email, credentials.password, bankAccount?.accountNumber])

    useEffect(() => {
        if (step === 1) AuthService.removeSignup()
    }, [])

    const getTitle = () => {
        switch (step) {
            case 1:
                return 'Organizer signup'

            case 2:
                return 'Organization information'

            case 3:
                return 'Team management'

            case 4:
                return 'Payment information'

            case 5:
                return 'Tax status'

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

    const getRolesAndPermissions = () => {
        getOrganizationRoles()
            .then((res) => { setRoles(res.data) })
            .catch((err) => console.error(err))

        getOrganizationPermissions()
            .then((res) => setPermissions(formatPermissions(res.data.data)))
            .catch((err) => console.error(err))

        getTeam()
            .then((res) => setMembers(formatMembers(res.data?.members)))
            .catch((err) => console.error(err))
    }

    const inviteMember = (member) => {
        createOrEditMember({ member })
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleMatching = () => {
        if (!isMatching(credentials.password, inputEl.current.value)) {
            setError({ type: 'match' })
        }
    }

    const handleStep = (curStep, setter) => {
        setter(curStep + 1)
    }

    const handleGoBack = () => {
        if (taxStep > 1) {
            setTaxStep(taxStep - 1)
        } else {
            setStep(step - 1)
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
            if (!error.type) {
                credentials['username'] = credentials.email;
                credentials['gender'] = 'other';
                const today = new Date()
                const days = 86400000 //number of milliseconds in a day
                const hundredDaysAgo = new Date(today - (100 * days))
                credentials['dob'] = hundredDaysAgo;
                register(credentials)
                    .then((res) => {
                        AuthService.setSignUpToken(res.data?.jwt);
                        handleStep(curStep, setter)
                    })
                    .catch((err) => {
                        console.error(err);
                        setError({ type: 'alreadyExist' })
                    })
            }
        }
        else if (step === 2) {
            createOrganization({ data: orgInfo })
                .then((res) => { handleStep(curStep, setter); getRolesAndPermissions() })
                .catch((err) => console.error(err))
        }
        else if (step === 4) {
            createPaymentInfo({ data: bankAccount })
                .then((res) => { setCompany(res.data); handleStep(curStep, setter) })
                .catch((err) => console.error(err))
        }
        else if (step === 5 && taxStep === 4) {
            // setIsSuccess(true)
        }
        else {
            handleStep(curStep, setter);
        }
        if (taxStep === 3) {
            createW9({ data: taxDetails })
                .then((res) => { AuthService.removeSignup(); setIsSuccess(true) })
                .catch((err) => console.error(err))
        }
    }

    const checkDisabled = () => {
        const { firstName, lastName, email, password } = credentials;

        return !firstName || !lastName || !email || !password || !isValid || error.type
    }

    return (
        <section id="sign-up-wrapper">
            {!isSuccess && (
                <Row>
                    <Col md={4}>
                        {step > 1 && (
                            <BackButton handleGoBack={handleGoBack} size="sm" />
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
                                <Form.Group className='form-group' controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="e.g mail@example.com"
                                        value={credentials.email}
                                        onChange={handleCredentials}
                                    />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="password">
                                    <Form.Label>Create a Password</Form.Label>
                                    <PasswordInputWrapper value={credentials.password} isValid={error?.type !== 'match'} onBlur={handleMatching} handlePassword={handleCredentials} />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="repeatPassword">
                                    <Form.Label>Repeat password</Form.Label>
                                    <PasswordInput placeholder="Confirm password" isValid={error?.type !== 'match'} onBlur={handleMatching} reference={inputEl} />
                                </Form.Group>
                                {error?.type === 'match' && (
                                    <Error type="match" />
                                )}
                                {error?.type === 'alreadyExist' && (
                                    <Error type="alreadyExist" />
                                )}
                            </Form>
                        )}
                        {step === 2 && (
                            <OrganizationInformationWrapper getOrgInfo={setOrgInfo} />
                        )}
                        {step === 3 && (
                            <>
                                <Roles roles={roles} permissions={permissions} createRoles={createRoles} setRoles={setRoles} />
                                <Team members={members} roles={roles} inviteMember={inviteMember} />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <h1 className='normal'>Bank information</h1>
                                <div className="seperator">
                                    <BankAccountDetailsWrapper getBankAccount={bankAccount} isValid={isValid} setIsValid={setIsValid} submitBankAccount={setBankAccount} />
                                </div>
                            </>
                        )}
                        {step === 5 && !isSuccess && (
                            <TaxWrapper step={taxStep} setStep={setTaxStep} getTaxDetails={setTaxDetails} company={company} />
                        )}

                        {!isSuccess && (
                            <Button size="lg" className='mt-4 w-100 btn-next' disabled={checkDisabled()} onClick={handleNext}>{taxStep === 3 ? 'Create' : 'Next'}</Button>
                        )}

                        {step === 1 && (
                            <div className="text-center mt-4 caption">
                                <span className='text-muted'>Already have an account? <Link to="/login">Login</Link></span>
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
