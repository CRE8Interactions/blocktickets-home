import React, { Fragment, useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import { createBankAccount } from '../../../utilities/api';
import { stateOpt } from '../../../utilities/helpers';

import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChequeImg } from './ChequeImg';
import { Spinner } from '../../SpinnerContainer/Spinner';

export default function BankAccountDetailsModal({ handleClose, account, show }) {
    const [
        formValid,
        setFormValid
    ] = useState(false);

    const [
        formData,
        setFormData
    ] = useState(account);

    const [
        accountType,
        setAccountType
    ] = useState('checking');

    const [
        accountName,
        setAccountName
    ] = useState('');

    const [
        firstName,
        setFirstName
    ] = useState('');

    const [
        lastName,
        setLastName
    ] = useState('');

    const [address, setAddress] = useState({
        state: stateOpt[0].value
    })

    const [dob, setDob] = useState('')

    const [isDobValid, setIsDobValid] = useState(true)

    const [ssn, setSsn] = useState('')

    const [ssnNumError, setSsnNumError] = useState(false)

    const [
        accountNumber,
        setAccountNumber
    ] = useState('');

    const [
        routingNumber,
        setRoutingNumber
    ] = useState('');

    const [
        routingNumError,
        setRoutingNumError
    ] = useState(false);

    const [
        accountNumError,
        setAccountNumError
    ] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const [isSaving, setIsSaving] = useState(false)

    // update state when there is an account 
    useEffect(() => {
        if (account) {
            setAccountName(account?.accountName);
            setAccountType(account?.accountType);
            setFirstName(account?.firstName);
            // setAddress(account?.address);
            // setDob(account?.dob);
            // setSsn(account?.ssn);
            setRoutingNumber(account?.routingNumber);
            setAccountNumber(account?.accountNumber);
        }
    }, [account])


    // reset error when inputs are changed
    useEffect(
        () => {
            validInputs();
        },
        [
            accountNumber,
            routingNumber,
            ssn
        ]
    );

    // reset error when state are changed
    useEffect(
        () => {
            checkValid();
        },
        [
            accountType,
            firstName,
            lastName,
            dob,
            address,
            ssn,
            accountNumber,
            routingNumber,
            accountName,
            routingNumError,
            accountNumError
        ]
    );

    // reset error when accountNumber input changed
    useEffect(
        () => {
            setAccountNumError(false);
        },
        [
            accountNumber
        ]
    );

    // reset error when rountingNumber input change
    useEffect(
        () => {
            setRoutingNumError(false);
        },
        [
            routingNumber
        ]
    );

    // reset error when snn input change
    useEffect(
        () => {
            setSsnNumError(false);
        },
        [
            ssn
        ]
    );

    // reset error when dob input change
    useEffect(
        () => {
            if (!isDobValid) {
                setIsDobValid(true);
            }
        },
        [
            dob
        ]
    );

    const handleAddress = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validInputs = () => {
        if (routingNumber && !(routingNumber.length >= 9)) {
            setRoutingNumError(true);
        }
        if (accountNumber && !(accountNumber.length >= 9)) {
            setAccountNumError(true);
        }

        if (ssn && !(ssn.length >= 4)) {
            setSsnNumError(true)
        }
    }

    // validate dob using react-input-mask
    let formatChars = {

        'm': '[0-1]', // only acceps 0 or 1 for first digit
        'M': '[0-9]',
        'd': '[0-3]',
        'D': '[1-9]',
        'Y': '[0-9]'
    };

    let beforeMaskedValueChange = (newState, oldState, userInput) => {
        let { value } = newState;
        console.log(value);

        let dateParts = value.split('/');
        let monthPart = dateParts[0];
        console.log('Month', monthPart);
        let dayPart = dateParts[1]
        console.log('Day', dayPart)
        let yearPart = dateParts[2];

        // Conditional mask for the 2nd digit of month based on the first digit
        if (monthPart.startsWith('1'))
            formatChars['M'] = '[0-2]'; // To block 13, 15, etc.
        else
            formatChars['M'] = '[1-9]'; // To allow 05, 08, etc - but blocking 00.

        // Conditional mask for day
        if (!yearPart.includes('_') && !monthPart.includes('_')) {

            // Find last day of the month
            let endOfMonth = new Date(`${yearPart}-01-01`);
            endOfMonth.setMonth(parseInt(monthPart));
            endOfMonth.setDate(0);
            let lastDayOfMonth = endOfMonth.getDate().toString();

            // Set [0-x] dynamically for the first digit based of last day
            formatChars['d'] = `[0-${lastDayOfMonth[0]}]`;

            if (dayPart.startsWith(lastDayOfMonth[0]))
                formatChars['D'] = `[0-${lastDayOfMonth[1]}]`; // Limit month's last digit based on last day
            else if (dayPart.startsWith('0'))
                formatChars['D'] = '[1-9]'; // To block 00.
            else
                formatChars['D'] = '[0-9]'; // To allow days to start with 1 Eg: 10, 12, 15, etc.
        }

        return { value, selection: newState.selection };
    }

    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
    function isValidDate() {
        let dateString = dob;
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            setIsDobValid(false);

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            setIsDobValid(false);

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        setIsDobValid(day > 0 && day <= monthLength[month - 1])
    };

    const checkValid = () => {
        if ((account?.accountType || accountType) && (account?.accountName || accountName) && (account?.firstName || firstName) && (account?.lastName || lastName) && (account?.accountNumber || accountNumber) && (account?.routingNumber || routingNumber) && (account?.address || address) && (account?.dob || dob) && (account?.ssn || ssn) && !routingNumError && !accountNumError && ssnNumError && isDobValid) {
            setFormValid(true);
        }
        else {
            setFormValid(false);
        }
    }

    const notificationModal = () => {
        if (showAlert) {
            return (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    <p>
                        Your Bank Details have successfully been updated.
                    </p>
                </Alert>
            );
        }
    }

    const submitForm = () => {
        setIsSaving(true)
        let data = {
            data: {
                accountType: accountType ? accountType : account.accountType,
                accountName: accountName ? accountName : account.accountName,
                firstName: firstName ? firstName : account.firstName,
                lastName: lastName ? lastName : account.lastName,
                // dob: dob ? dob : account.dob,
                // address: address ? address : account.address,
                // ssn: ssn ? snn : account.ssn, 
                accountNumber: accountNumber ? accountNumber : account.accountNumber,
                routingNumber: routingNumber ? routingNumber : account.routingNumber,
                currency: 'usd'
            }
        };

        createBankAccount(data).then(() => {
            setIsSaving(false)
            location.reload()
        }).catch(err => {
            console.error(err)
            setIsSaving(false)
        })
    };

    return (
        <Fragment>
            <Modal show={show} centered onHide={handleClose} backdrop={'static'} scrollable animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title as="h5">Bank Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex-column">
                        {notificationModal()}
                        <Form.Group className="form-group" controlId="accountName">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name of bank"
                                required
                                name="accountName"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="form-group" controlId="account">
                            <Form.Label>Payout Type</Form.Label>
                            <Form.Select
                                name="account"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                required>
                                <option value="checking">Checking</option>
                                <option value="savings">Savings</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="form-group" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                required
                                name="firstName"
                                value={firstName}
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
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <fieldset className='form-group'>
                            <legend className='form-label'>Address</legend>
                            <Stack gap={2}>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    aria-label="Address 1"
                                    required
                                    placeholder="Address 1"
                                    value={address.address_1}
                                    onChange={handleAddress}
                                />
                                <Form.Control
                                    type="text"
                                    name="address2"
                                    aria-label="Address 2"
                                    placeholder="Address 2"
                                    value={address.address2}
                                    onChange={handleAddress}
                                />
                                <Form.Control
                                    type="text"
                                    name="city"
                                    aria-label="City"
                                    required
                                    placeholder="City"
                                    value={address.city}
                                    onChange={handleAddress}
                                />
                                <Row>
                                    <Col xs={4}>
                                        <Form.Control
                                            type="text"
                                            name="zip_code"
                                            aria-label="Zip Code"
                                            required
                                            placeholder="Zip code"
                                            value={address.zip_code}
                                            onChange={handleAddress}
                                        />
                                    </Col>
                                    <Col className='ps-0'>
                                        <Form.Select aria-label="State" value={address.state} onChange={handleAddress} name="state">
                                            {stateOpt.map((option, index) => (
                                                <option key={index} value={option.value}>{option.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Stack>
                        </fieldset>
                        <Form.Group className="form-group" controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <InputMask
                                mask='mM/dD/YYYY'
                                alwaysShowMask={true}
                                value={dob}
                                placeholder="MM / DD / YYYY"
                                name="dob"
                                onBlur={isValidDate}
                                className={`${!isDobValid ? 'error-border' : ''}`}
                                formatChars={formatChars}
                                beforeMaskedValueChange={beforeMaskedValueChange}
                                onChange={(e) => setDob(e.target.value)}>
                                {(inputProps) => <Form.Control {...inputProps} />}
                            </InputMask>
                            <Form.Text>Format: MM/DD/YYYY</Form.Text>
                            {dob &&
                                !isDobValid && (
                                    <Form.Text className="d-block text-danger">Date must be a valid date</Form.Text>
                                )}
                        </Form.Group>
                        <div className="d-flex-column mt-3 align-items-center">
                            <ChequeImg />
                        </div>
                        <Form.Group className="form-group" controlId="routingNumber">
                            <Form.Label>Routing Number</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={routingNumber}
                                pattern="[0-9]*"
                                placeholder="XXXXXXXX"
                                maxLength="9"
                                name="routingNumber"
                                onBlur={validInputs}
                                onChange={(e) =>
                                    setRoutingNumber((routing) =>
                                        e.target.validity.valid || e.target.value === '' ? e.target.value : routing
                                    )}
                                className={routingNumber && routingNumError ? 'error-border' : ''}
                            />
                            {routingNumber &&
                                routingNumError && (
                                    <Form.Text className="text-danger">Routing Number must be 9 digits</Form.Text>
                                )}
                        </Form.Group>
                        <Form.Group className="form-group" controlId="accountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={accountNumber}
                                pattern="[0-9]*"
                                placeholder="XXXXXXXX"
                                maxLength="9"
                                name="accountNumber"
                                onBlur={validInputs}
                                onChange={(e) =>
                                    setAccountNumber(
                                        (acc) =>
                                            e.target.validity.valid || e.target.value === '' ? e.target.value : acc
                                    )}
                                className={accountNumber && accountNumError ? 'error-border' : ''}
                            />
                            {accountNumber &&
                                accountNumError && (
                                    <Form.Text className="text-danger">
                                        Account Number must be 9 digits
                                    </Form.Text>
                                )}
                        </Form.Group>
                        <Form.Group className="form-group" controlId="ssn">
                            <Form.Label>Last 4 digits of Social Security number</Form.Label>
                            <div className={`input-wrapper ps-2 ${ssn && ssnNumError ? 'input-wrapper-error' : ''}`}>
                                <span style={{ whiteSpace: 'nowrap' }}>&bull; &bull; &bull; - &bull; &bull; -</span>
                                <Form.Control
                                    type="text"
                                    required
                                    value={ssn}
                                    pattern="[0-9]*"
                                    placeholder="8888"
                                    maxLength="4"
                                    name="ssn"
                                    onBlur={validInputs}
                                    onChange={(e) =>
                                        setSsn((ssn) =>
                                            e.target.validity.valid || e.target.value === '' ? e.target.value : ssn
                                        )}
                                    className="ps-1"
                                />
                            </div>
                            <Form.Text>The last 4 digits of your SSN are only used to verify your identity—no credit checks.</Form.Text>
                            {ssn &&
                                ssnNumError && (
                                    <Form.Text className="d-block text-danger">
                                        Social Security Number must be 4 digits
                                    </Form.Text>
                                )}
                        </Form.Group>

                        <Button disabled={!formValid} className="icon-button" size="lg" onClick={submitForm}>
                            {isSaving ? (
                                <Spinner />
                            ) : (
                                'Link bank account'
                            )}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}
