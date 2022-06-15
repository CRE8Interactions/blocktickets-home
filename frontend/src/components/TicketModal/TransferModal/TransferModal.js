import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { isValidPhoneNumber } from 'react-phone-number-input';

import { toggleElement } from '../../../utilities/helpers';
import { createTicketTransfer } from '../../../utilities/api';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { DisplayTickets } from '../DisplayTickets';
import { PhoneNumberInput } from '../../PhoneNumberInput';
import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';

export default function TransferModal({ handleClose, setTicketStatus, order, getMyOrders }) {

    // 1 - tranfer 
    // 2 - phone number 
    // 3 - confirmation 
    // 4 - success
    const [
        step,
        setStep
    ] = useState(1);

    // select tickets
    const [
        selectedTickets,
        setSelectedTickets
    ] = useState([]);

    const [
        phoneNumber,
        setPhoneNumber
    ] = useState('');

    const [isValid, setIsValid] = useState(true)

    // reset validation
    useEffect(() => {
        setIsValid(true)

    }, [phoneNumber])

    useLayoutEffect(() => {
        let el = document.querySelector('.btn-close');

        if (el) {
            if (step === 4)
                toggleElement(el, false)

            return () => {
                toggleElement(el, true)
            }
        };
    }, [step])

    const submit = (e) => {
        if (e) e.preventDefault();
        if (validNumber())
            setStep(3)
        else { setIsValid(false) }
    };

    const submitTransfer = () => {
        let ticketIds = selectedTickets.map((ticket) => ticket.id)
        let data = {
            phoneNumber: phoneNumber,
            orderId: order.id,
            ticketIds
        };

        createTicketTransfer(data)
            .then((res) => {
                setStep(4)
            })
            .catch((err) => console.error(err));
    }

    const validNumber = () => {
        return phoneNumber && isValidPhoneNumber(phoneNumber);
    };

    const handleClick = () => {
        handleClose();
        if (step === 4) setTicketStatus('transferred')
    };

    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Transfer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <>
                        <DisplayTickets status="transfer" role='select' setSelectedTickets={setSelectedTickets} tickets={order?.tickets} />
                        <Stack direction="horizontal" className="btn-group-flex">
                            <Button onClick={() => setStep(2)} className="btn-next" size="lg" disabled={selectedTickets.length === 0} >
                                Next
                            </Button>
                        </Stack>
                    </>)}
                {step === 2 && (
                    <Fragment>
                        <div className="modal-body-heading">
                            <h4 className="modal-body-heading-title">
                                Enter the recepient phone number{' '}
                            </h4>
                            <p className="small">
                                The recipient will get notified via sms that you have transferred your tickets to them.
                            </p>
                        </div>
                        <Form onSubmit={(e) => submit(e)}>
                            <PhoneNumberInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} hasError={!isValid} />
                        </Form>
                        <Stack direction="horizontal" className="btn-group-flex">
                            <Button
                                onClick={submit}
                                disabled={!phoneNumber || !isValid} size="lg" className="btn-next">
                                Transfer
                            </Button>
                        </Stack>
                    </Fragment>
                )}
                {step === 3 && (
                    <Fragment>
                        <div className="modal-body-heading">
                            <h4 className="modal-body-heading-title">
                                Are you sure you want to transfer these tickets?
                            </h4>
                            <DisplayTickets selectedTickets={selectedTickets} />
                        </div>
                        <div>
                            <p className='fw-medium text-muted mb-2'>Recipient phone number</p>
                            <span className='fs-md fw-bold'>{phoneNumber}</span>
                        </div>
                        <Stack className="btn-group-flex">
                            <Button onClick={handleClose} variant="outline-light" size="lg">Cancel</Button>
                            <Button
                                onClick={(e) => submitTransfer()}
                                size="lg" >
                                Transfer
                            </Button>
                        </Stack>
                    </Fragment>
                )}
                {step === 4 && (
                    <Fragment>
                        <SuccessContainer>
                            <h4 className="modal-body-heading-title">Your tickets have been transferred! </h4>
                        </SuccessContainer>

                        <p className="small">
                            Your transfer is pending till the recipient claims the tickets. You can cancel the transfer while it's pending. Once it's claimed by the recipient the tickets will no longer be in your account.
                        </p>
                        <SuccessDisclaimer />

                        <Stack className="btn-group-flex">
                            <Link to="/my-transfers" className="btn btn-lg btn-outline-light">Go to My transfers</Link>
                            {selectedTickets.length !== order?.tickets?.length && (<Button onClick={handleClick} size='lg'>Close</Button>)}
                        </Stack>
                    </Fragment>
                )}
            </Modal.Body>
        </Fragment>
    );
}
