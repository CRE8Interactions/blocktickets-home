import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';

import UserContext from '../../context/User/User'
import AuthService from '../../utilities/services/auth.service';
import {
    createOrganization, getOrganizationRoles, getOrganizationPermissions,
    createOrEditRole, getTeam, createOrEditMember, createPaymentInfo, createW9, register, removeTeamMember
} from '../../utilities/api'
import { isMatching, formatPermissions, formatMembers } from '../../utilities/helpers'

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
import { Spinner } from '../Spinner';

import './signUpWrapper.scss'

export default function SignUpWrapper() {

    const { setAuthenticated } = useContext(UserContext);

    const passwordEl = useRef();
    const repeatedPasswordEl = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    // get org information from organization information child component
    const [orgInfo, setOrgInfo] = useState()

    // get tax details from tax status child component
    const [taxDetails, setTaxDetails] = useState()

    // get payment information from payment information child component
    const [bankAccount, setBankAccount] = useState({})

    const [step, setStep] = useState(1)

    const [taxStep, setTaxStep] = useState()

    const [isValid, setIsValid] = useState(true)

    const [error, setError] = useState({})

    const [formValid, setFormValid] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    const [isSuccess, setIsSuccess] = useState(false)

    const [roles, setRoles] = useState([])

    const [permissions, setPermissions] = useState([])

    const [members, setMembers] = useState([])

    const [company, setCompany] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
        // Get Roles and Permissions if refresh browser on step 3
        if (step === 3 && roles.length === 0) getRolesAndPermissions()
    }, [step, taxStep])


    useEffect(() => {
        setError({})
        setIsValid(true)
    }, [credentials.email, credentials.password, orgInfo?.name, bankAccount?.accountNumber])

    // go to step based on url if browser refresh 
    useEffect(() => {
        switch (location.pathname) {
            case '/signup/organization-information':
                setStep(2)
                break;

            case '/signup/team-management':
                setStep(3)
                break;

            case '/signup/payment-information':
                setStep(4)
                break;

            case '/signup/tax-status':
                setStep(5)
                break;

            default:
                break;
        }
    }, [location])


    useEffect(() => {

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

    const createRoles = (data) => {
        createOrEditRole({ data })
            .then((res) => setRoles(res.data))
            .catch((err) => console.error(err))
    }

    const getRolesAndPermissions = () => {
        getOrganizationRoles()
            .then((res) => {
                setRoles(res.data)
            })
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
            .then((res) => {
                setMembers(res.data)
            })
            .catch((err) => console.error(err))
    }

    const removeMember = (member) => {
        removeTeamMember(member)
            .then((res) => {
                let newMembers = members.filter(m => m.email != member.email)
                setMembers(newMembers)
            })
            .catch((err) => console.error(err))
    }

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleValid = () => {
        if (!isMatching(credentials.password, repeatedPasswordEl
            .current.value)) {
            setError({ type: 'match' })
        }

        if (!passwordEl.current.validity.valid) {
            setError({ type: 'patternMatch' })
        }
    }

    const handleStep = (curStep, setter) => {
        setter(curStep + 1)
    }

    const handleGoBack = () => {
        if (taxStep > 1) {
            setTaxStep(taxStep - 1)
        } else {
            navigate(-1)
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
                setIsSaving(true)
                credentials['username'] = credentials.email;
                credentials['gender'] = 'other';
                const today = new Date()
                const days = 86400000 //number of milliseconds in a day
                const hundredDaysAgo = new Date(today - (100 * days))
                credentials['dob'] = hundredDaysAgo;
                register(credentials)
                    .then((res) => {
                        AuthService.setSignUpToken(res.data?.jwt);
                        setIsSaving(false)
                        navigate("organization-information");
                        handleStep(curStep, setter)
                    })
                    .catch((err) => {
                        setIsSaving(false)
                        if (err.response.status === 400) setError({ type: "alreadyExist", field: 'email' })
                        else setError({ type: 'default' })
                    })
            }
        }
        else if (step === 2) {
            setIsSaving(true)
            createOrganization({ data: orgInfo })
                .then((res) => {
                    setIsSaving(false)
                    handleStep(curStep, setter);
                    navigate("/signup/team-management");
                    getRolesAndPermissions()
                })
                .catch((err) => {
                    setIsSaving(false)
                    console.log(orgInfo);
                    setError({ type: 'alreadyExist', field: 'organization name' })
                    console.error(err);
                })
        }
        else if (step === 3) {
            navigate("/signup/payment-information")
            handleStep(curStep, setter);
        }
        else if (step === 4) {
            setIsSaving(true)
            createPaymentInfo({ data: bankAccount })
                .then((res) => {
                    setIsSaving(false)
                    setCompany(res.data);
                    navigate("/signup/tax-status");
                    handleStep(curStep, setter)
                })
                .catch((err) => {
                    setIsSaving(false)
                    console.error(err)
                })
        }
        else if (step === 5 && taxStep === 3) {
            setIsSaving(true)
            createW9({ data: taxDetails })
                .then((res) => {
                    setIsSaving(false)
                    setIsSuccess(true)
                })
                .catch((err) => {
                    setIsSaving(false)
                    console.error(err)
                })
        }
        else {
            handleStep(curStep, setter);
        }
    }

    const checkDisabled = () => {
        switch (step) {

            case 1:

                const { firstName, lastName, email, password } = credentials;

                return !firstName || !lastName || !email || !password || error.type

            case 2:
                if (orgInfo) {
                    return !orgInfo.orgName || !orgInfo.address?.address_1 || !orgInfo.address?.city || !orgInfo.address?.zipcode || !orgInfo.address?.state || error.type
                }
                else {
                    return false
                }

            default:
                return;
        }

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
                                        className={`${error.type === 'alreadyExist' ? 'error-border' : ''}`}
                                        value={credentials.email}
                                        onChange={handleCredentials}
                                    />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="password">
                                    <Form.Label>Create a Password</Form.Label>
                                    <PasswordInputWrapper reference={passwordEl} value={credentials.password} isValid={(error?.type !== 'match' && error?.type !== "patternMatch")} onBlur={handleValid} handlePassword={handleCredentials} />
                                </Form.Group>
                                <Form.Group className='form-group' controlId="repeatPassword">
                                    <Form.Label>Repeat password</Form.Label>
                                    <PasswordInput placeholder="Confirm password" isValid={error?.type !== 'match'} onBlur={handleValid} reference={repeatedPasswordEl} />
                                </Form.Group>
                                {error?.type && (
                                    <Error type={error.type} field={error.field} />
                                )}

                            </Form>
                        )}
                        {step === 2 && (
                            <>
                                <OrganizationInformationWrapper getOrgInfo={setOrgInfo} error={error} />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Roles roles={roles} permissions={permissions} createRoles={createRoles} setRoles={setRoles} />
                                <Team members={members} roles={roles} inviteMember={inviteMember} removeMember={removeMember} />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <h1 className='normal'>Bank information</h1>
                                <div className="seperator">
                                    <BankAccountDetailsWrapper getBankAccount={setBankAccount} isValid={isValid} setIsValid={setIsValid} />
                                </div>
                            </>
                        )}
                        {step === 5 && !isSuccess && (
                            <TaxWrapper step={taxStep} setStep={setTaxStep} getTaxDetails={setTaxDetails} company={company} />
                        )}

                        {!isSuccess && (
                            <Button size="lg" className={`mt-4 w-100 ${!isSaving && 'btn-next'} `} disabled={checkDisabled()} onClick={handleNext}>{isSaving ? (
                                <Spinner />
                            ) : (
                                taxStep === 3 ? 'Create' : 'Next'
                            )}
                            </Button>
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
                        <Link to="/" className="btn btn-primary btn-next btn-lg w-100">Go to creator panel</Link>
                    </SuccessContainer>
                </div>
            )}
        </section>
    )
}
