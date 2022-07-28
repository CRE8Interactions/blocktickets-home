import React, { Fragment, useState, useEffect, createElement } from 'react';
import { createBankAccount } from '../../../utilities/api';

import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ChequeImg } from './ChequeImg';

export default function BankAccountDetailsModal({ handleClose, account, show }) {
    const [
        formValid,
        setFormValid
    ] = useState(false);

    const [
        routingNumError,
        setRoutingNumError
    ] = useState(false);

    const [
        accountNumError,
        setAccountNumError
    ] = useState(false);

    const [
        formData,
        setFormData
    ] = useState(account);

    const [
        accountType,
        setAccountType
    ] = useState(account ? account?.accountType : 'checking');

    const [
        accountName,
        setAccountName
    ] = useState(account?.accountName);

    const [
        firstName,
        setFirstName
    ] = useState(account?.firstName);

    const [
        lastName,
        setLastName
    ] = useState(account?.lastName);

    const [
        accountNumber,
        setAccountNumber
    ] = useState(account?.accountNumber);

    const [
        routingNumber,
        setRoutingNumber
    ] = useState(account?.routingNumber);

    const [showAlert, setShowAlert] = useState(false);


    // reset error when inputs are changed
    useEffect(
        () => {
            validInputs();
        },
        [
            accountType,
            firstName,
            lastName,
            accountNumber,
            routingNumber,
            accountName
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

    useEffect(() => {
        validInputs();
    }, []);

    const validInputs = () => {
        if (routingNumber && routingNumber.length < 9) {
            setRoutingNumError(true);
        }
        if (accountNumber && accountNumber.length < 9) {
            setAccountNumError(true);
        }
        if ((account?.accountType || accountType) && (account?.accountName || accountName) && (account?.firstName || firstName) && (account?.lastName || lastName) && (account?.accountNumber || accountNumber) && (account?.routingNumber || routingNumber)) {
            setFormValid(true);
        }
        else {
            setFormValid(false);
        }
    };

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
        let data = {
            data: {
                accountType: accountType ? accountType : account.accountType,
                accountName: accountName ? accountName : account.accountName,
                firstName: firstName ? firstName : account.firstName,
                lastName: lastName ? lastName : account.lastName,
                accountNumber: accountNumber ? accountNumber : account.accountNumber,
                routingNumber: routingNumber ? routingNumber : account.routingNumber,
                currency: 'usd'
            }
        };

        createBankAccount(data).then(() => {
            location.reload()
        }).catch(err => console.error(err))
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
                                defaultValue={account?.accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="form-group" controlId="account">
                            <Form.Label>Payout Type</Form.Label>
                            <Form.Select
                                name="account"
                                defaultValue={account?.accountType}
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
                                defaultValue={account?.firstName}
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
                                defaultValue={account?.lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex-column mt-3 align-items-center">
                            <ChequeImg />
                        </div>
                        <Form.Group className="form-group" controlId="routingNumber">
                            <Form.Label>Routing Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter routing number"
                                required
                                value={account?.routingNumber}
                                pattern="[0-9]*"
                                maxLength="9"
                                name="routingNumber"
                                onChange={(e) =>
                                    setRoutingNumber(
                                        (routing) =>
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
                                placeholder="Enter account number"
                                required
                                defaultValue={account?.accountNumber}
                                pattern="[0-9]*"
                                name="accountNumber"
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
                                        Account Number is invalid. Please try again
                                    </Form.Text>
                                )}
                        </Form.Group>

                        <Button disabled={!formValid} size="lg" onClick={(e) => submitForm()}>
                            Save Bank details
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}
