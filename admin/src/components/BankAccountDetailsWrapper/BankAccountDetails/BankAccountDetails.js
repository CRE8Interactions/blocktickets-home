import React from 'react'

import { stateOpt } from '../../../utilities/helpers';

import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Error } from '../../Error'
import { ChequeImg } from "./ChequeImg";

export default function BankAccountDetails({ bankAccount, routingNumError, accountNumError, inputEl, handleBankDetails, handleIsMatching, validInputs, isValid }) {

    return (
        <Form>
            <Form.Group className="form-group" controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                    name="currency"
                    defaultValue='us'
                    disabled>
                    <option value={bankAccount.currency}>United States Dollars USD</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="form-group" controlId="country">
                <Form.Label>In which country will you be paid</Form.Label>
                <Form.Select
                    name="country"
                    defaultValue={bankAccount.country}
                    disabled>
                    <option value={bankAccount.country}>United States</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="form-group" controlId="name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    required
                    name="companyName"
                    onChange={handleBankDetails}
                />
            </Form.Group>
            <fieldset className='form-group'>
                <legend className='form-label'>Address</legend>
                <Stack gap={2}>
                    <Form.Control
                        type="text"
                        name="address"
                        aria-label="Address"
                        required
                        placeholder="Address"
                        value={bankAccount.address}
                        onChange={handleBankDetails}
                    />
                    <Form.Control
                        type="text"
                        name="address2"
                        aria-label="Address 2"
                        required
                        placeholder="Address 2"
                        value={bankAccount.address2}
                        onChange={handleBankDetails}
                    />
                    <Form.Control
                        type="text"
                        name="city"
                        aria-label="City"
                        required
                        placeholder="City"
                        value={bankAccount.city}
                        onChange={handleBankDetails}
                    />
                    <Row>
                        <Col xs={4}>
                            <Form.Control
                                type="text"
                                name="zip_code"
                                aria-label="Zip Code"
                                required
                                placeholder="Zip code"
                                value={bankAccount.zip_code}
                                onChange={handleBankDetails}
                            />
                        </Col>
                        <Col className='ps-0'>
                            <Form.Select aria-label="State" value={bankAccount.state} onChange={handleBankDetails} name="state">
                                {stateOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Stack>
            </fieldset>
            <fieldset className='form-group'>
                <legend className="form-label">Bank Account Type</legend>
                <div>
                    <Form.Check
                        inline
                        label="Checking"
                        name="type"
                        value="checking"
                        defaultChecked={bankAccount.type === "checking"}
                        onChange={handleBankDetails}
                        type="radio"
                        id={`inline-radio-checking`}
                    />
                    <Form.Check
                        inline
                        label="Saving"
                        name="type"
                        value="saving"
                        defaultChecked={bankAccount.type === "saving"}
                        onChange={handleBankDetails}
                        type="radio"
                        id={`inline-radio-saving`}
                    />
                </div>
            </fieldset>
            <Form.Group className="form-group" controlId="accountName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g Wells Fargo, Chase, Bank of America"
                    required
                    name="bankName"
                    onChange={handleBankDetails}
                />
            </Form.Group>
            <div className="d-flex-column mt-3 align-items-center">
                <ChequeImg />
            </div>
            <Form.Group className="form-group" controlId="routingNumber">
                <Form.Label>Routing Number</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={bankAccount.routingNumber}
                    placeholder="XXXXXXXX"
                    pattern="[0-9]*"
                    maxLength="9"
                    name="routingNumber"
                    onChange={(e) => handleBankDetails(e.target.value === '' || e.target.validity.valid ? e : bankAccount.routingNumber)}
                    onBlur={validInputs}
                    className={routingNumError ? 'error-border' : ''}
                />
                {routingNumError && (
                    <Form.Text className="text-danger">Routing Number must be 9 digits</Form.Text>
                )}
            </Form.Group>
            <Form.Group className="form-group" controlId="accountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={bankAccount.accountNumber}
                    placeholder="XXXXXXXX"
                    pattern="[0-9]*"
                    maxLength="9"
                    name="accountNumber"
                    onChange={(e) => handleBankDetails(e.target.value === '' || e.target.validity.valid ? e : bankAccount.accountNumber)}
                    onBlur={validInputs}
                    className={accountNumError ? 'error-border' : ''}
                />
                {accountNumError && (
                    <Form.Text className="text-danger">
                        Account Number must be 9 digits
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="form-group" controlId="repeatAccountNumber">
                <Form.Label>Re-enter Account Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="XXXXXXXXX"
                    required
                    pattern="[0-9]*"
                    maxLength="9"
                    ref={inputEl}
                    onBlur={handleIsMatching}
                    className={!isValid ? 'error-border' : ''}
                />
            </Form.Group>
            {!isValid && (
                <Error type="match" field="account number" />
            )}
        </Form>
    )
}
