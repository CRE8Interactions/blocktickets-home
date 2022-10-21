import React, { Fragment, useState } from 'react';

import { removeBankAccount } from '../../../utilities/api';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { LinkBankAccountBtn } from './../LinkBankAccountBtn';
import { BankAccountDetailsModal } from '../BankAccountDetailsModal';

import './bankAccount.scss';

export default function BankAccount({ account, getAccount }) {

    const hasBankAccount = account && account.accountNumber ? true : false;

    const [
        show,
        setShow
    ] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    };

    const removeBank = () => {
        removeBankAccount().then(() => getAccount()).catch(err => console.error(err))
    }

    return (
        <Fragment>
            {hasBankAccount ? (
                <Card body id="bank-account-card" className="card-md card--light">
                    <Card.Title as="h5" className="mb-3">
                        Bank Information
                    </Card.Title>
                    <ul>
                        <li>
                            <Card.Text>{account.accountName}</Card.Text>
                        </li>
                        <li>
                            <Card.Text>{account?.accountType?.toUpperCase()} XXXXX{account.accountNumber.substring(account.accountNumber.length - 4)}</Card.Text>
                        </li>
                        <li>
                            <Card.Text>U.S. Dollars, United States</Card.Text>
                        </li>
                    </ul>
                    <Stack direction="horizontal" className="mt-3">
                        <Button variant="link" onClick={handleShow}>
                            Edit
                        </Button>
                        {/* <Button variant="link" className="text-danger" onClick={removeBank}>
                            Delete
                        </Button> */}
                    </Stack>
                </Card>
            ) : (
                <LinkBankAccountBtn marginTop="0" />
            )}

            <BankAccountDetailsModal handleClose={handleClose} show={show} account={account} />
        </Fragment>
    );
}
