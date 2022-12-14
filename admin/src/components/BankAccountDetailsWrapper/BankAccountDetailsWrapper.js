import React, { useState, useEffect, useRef } from 'react'

import { isMatching, stateOpt } from '../../utilities/helpers';

import { BankAccountDetails } from './BankAccountDetails'

// child component used in SignUp and Settings Payment Information 
export default function BankAccountDetailsWrapper({ getBankAccount, getIsValid, account }) {

    const inputEl = useRef();

    const [isValid, setIsValid] = useState(true)

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

    // update state with bank account in Settings Payment Information
    useEffect(() => {
        if (account) {
            setBankAccount(account)
        }
    }, [account])

    // update parent state when state changes 
    useEffect(() => {
        getBankAccount(bankAccount)
    }, [bankAccount])

    // update parent state when state changes 
    useEffect(() => {
        if (routingNumError || accountNumError || !isValid) {
            getIsValid(false)
        } else {
            getIsValid(true)
        }
    }, [accountNumError, routingNumError, isValid])

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

    useEffect(() => {
        if (!isValid) {
            setIsValid(true)
        }

    }, [bankAccount?.accountNumber])

    // update state when there is an account 
    // useEffect(() => {
    //     if (account) {
    //         setAccountName(account?.accountName);
    //         setAccountType(account?.accountType);
    //         setFirstName(account?.firstName);
    //         setLastName(account?.lastName);
    //         setRoutingNumber(account?.routingNumber);
    //         setAccountNumber(account?.accountNumber);
    //     }
    // }, [account])

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
