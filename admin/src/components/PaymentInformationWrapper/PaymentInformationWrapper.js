import React, { useEffect, useState } from 'react';
import { getPaymentInfo } from '../../utilities/api';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { BankAccountDetailsModal } from "./BankAccountDetailsModal";
import { BankCard } from "./BankCard";

export default function PaymentInformationWrapper() {

    const [bankAccount, setBankAccount] = useState({
        accountNumber: '',
        accountType: '',
        bankName: '',
        companyName: '',
        routingNumber: ''
    })

    const [isValid, setIsValid] = useState(true)

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    useEffect(() => {
        if (!isValid) {
            setIsValid(true)
        }

    }, [bankAccount?.accountNumber])

    useEffect(() => {
        getPaymentInfo()
            .then((res) => setBankAccount(res.data))
            .catch((err) => console.error(err))
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
                        <BankCard handleShow={handleShow} bankAccount={bankAccount} />
                    ) : (
                        <Button size="lg" className="btn-plus w-100" onClick={handleShow}>Link bank account</Button>
                    )}
                </Card>
            </section>

            <BankAccountDetailsModal show={show} handleClose={handleClose} getBankAccount={setBankAccount} isValid={isValid} setIsValid={setIsValid} />
        </>
    );
}
