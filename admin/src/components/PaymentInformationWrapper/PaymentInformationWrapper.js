import React, { useEffect, useState } from 'react';

import { getPaymentInfo, removeBankAccount, createPaymentInfo } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { BankCard } from "./BankCard";
import { BankAccountDetailsModal } from "./BankAccountDetailsModal";

export default function PaymentInformationWrapper() {

    const [bankAccount, setBankAccount] = useState()

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => {
        
        createPaymentInfo({ data: bankAccount })
                .then(() => setShow(false))
                .catch((err) => {
                    console.error(err)
                })
    }

    const removeAccount = (account) => {
        removeBankAccount({accountId: account.id})
        .then(() => {
            setBankAccount({})
            getPaymentInfo()
        })
        .catch((err) => console.error(err))
    }

    const getAccountInfo = () => {
        getPaymentInfo()
            .then((res) => {
                setBankAccount(res.data)
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getAccountInfo()
    }, [])

    return (
        <>
            <section className='wrapper'>
                <header className="section-header">
                    <div className="section-heading section-heading--secondary">
                        <h1>Payment information</h1>
                    </div>
                    <p className='section-header-desc'>The money you make from your events will be issued to the bank account associated with this account</p>
                </header>
                <Card body className='card--sm'>
                    {bankAccount ? (
                        <BankCard handleShow={handleShow} bankAccount={bankAccount} removeAccount={removeAccount} />
                    ) : (
                        <Button size="lg" className="btn-plus w-100" onClick={handleShow}>Link bank account</Button>
                    )}
                </Card>
            </section>

            <BankAccountDetailsModal show={show} handleClose={handleClose} getBankAccount={setBankAccount} account={bankAccount} />
        </>
    );
}
