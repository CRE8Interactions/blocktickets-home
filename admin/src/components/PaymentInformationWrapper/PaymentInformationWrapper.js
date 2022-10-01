import React, { useEffect, useState } from 'react';

import AuthService from '../../utilities/services/auth.service';
import { getPaymentInfo } from '../../utilities/api';
import { checkPermission } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { BankCard } from "./BankCard";
import { BankAccountDetailsModal } from "./BankAccountDetailsModal";
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function PaymentInformationWrapper() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [bankAccount, setBankAccount] = useState()

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 10));

        getPaymentInfo()
            .then((res) => setBankAccount(res.data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <div className='position-relative'>
            <section className={`wrapper ${!hasPermission ? 'overlay' : ''}`}>
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

            <BankAccountDetailsModal show={show} handleClose={handleClose} getBankAccount={setBankAccount} account={bankAccount} />

            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
