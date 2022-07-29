import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BankAccountDetailsWrapper } from '../../BankAccountDetailsWrapper'

import './bankAccountDetails.scss';

export default function BankAccountDetailsModal({ show, handleClose, getBankAccount, id, isValid, setIsValid }) {

    return (
        <Modal id="bank-account" centered animation={false} backdrop="static" fullscreen="md-down" scrollable show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h4">{id ? 'Edit bank' : 'Bank'} information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BankAccountDetailsWrapper getBankAccount={getBankAccount} isValid={isValid} setIsValid={setIsValid} />
                <Stack direction="horizontal" className="btn-group-flex"><Button size="lg" onClick={handleClose}>{id ? 'Update' : 'Link'} bank account</Button></Stack>
            </Modal.Body>
        </Modal>

    );
}
