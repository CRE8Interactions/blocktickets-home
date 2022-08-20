import React, { useState, useEffect, useRef } from 'react'

import { isMatching, stateOpt } from '../../utilities/helpers';

import { BankAccountDetails } from './BankAccountDetails'

export default function BankAccountDetailsWrapper({ getBankAccount, isValid, setIsValid, submitBankAccount }) {

    const inputEl = useRef();

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

    const [bankAccount, setBankAccount] = useState(
        {
            currency: 'usd',
            country: 'us',
            companyName: '',
            address: '',
            address2: '',
            city: '',
            zip_code: '',
            state: stateOpt[0].value,
            type: 'saving',
            bankName: '',
            routingNumber: '',
            accountNumber: ''
        }
    )

    // update parent state when state changes 
    useEffect(() => {
        // getBankAccount(bankAccount)
        submitBankAccount(bankAccount)
    }, [bankAccount])

    // reset error when accountNumber input changed
    useEffect(
        () => {
            if (accountNumError) {
                setAccountNumError(false);
            }
        },
        [
            bankAccount.accountNumber
        ]
    );

    // reset error when rountingNumber input change
    useEffect(
        () => {
            if (routingNumError) {
                setRoutingNumError(false);
            }
        },
        [
            bankAccount.routingNumber
        ]
    );

    const handleIsMatching = () => {
        if (!isMatching(bankAccount.accountNumber, inputEl.current.value)) {
            setIsValid(false)
        }
    }

    const validInputs = () => {
        if (bankAccount.routingNumber && !(bankAccount.routingNumber.length >= 9)) {
            setRoutingNumError(true);
        }
        if (bankAccount.accountNumber && !(bankAccount.accountNumber.length >= 9)) {
            setAccountNumError(true);
        }
    };

    // const checkValid = () => {
    //     if ((account?.accountType || accountType) && (account?.accountName || accountName) && (account?.firstName || firstName) && (account?.lastName || lastName) && (account?.accountNumber || accountNumber) && (account?.routingNumber || routingNumber) && !routingNumError && !accountNumError) {
    //         setFormValid(true);
    //     }
    //     else {
    //         setFormValid(false);
    //     }
    // }

    const handleBankDetails = (e) => {
        setBankAccount({ ...bankAccount, [e.target.name]: e.target.value })
    }

    return (
        <BankAccountDetails bankAccount={bankAccount} routingNumError={routingNumError} accountNumError={accountNumError} inputEl={inputEl} handleBankDetails={handleBankDetails} handleIsMatching={handleIsMatching} validInputs={validInputs} isValid={isValid} />
    )
}
