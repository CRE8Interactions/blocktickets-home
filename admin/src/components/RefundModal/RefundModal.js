import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from "./../../utilities/helpers";

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { SuccessContainer } from './SuccessContainer'
import { SuccessDisclaimer } from './SuccessDisclaimer'

import './refundModal.scss';

export default function RefundModal({ show, handleClose }) {

    const navigate = useNavigate();

    // 1 - confirmation 
    // 2 - success 
    const [
        step,
        setStep
    ] = useState(1);

    const submitRefund = () => {
        setStep(2)
    }

    const handleClick = () => {
        navigate(-1);
        handleClose()
    }

    return (
        <Modal id="refund-modal" centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Body>
                {step === 1 && (
                    <>
                        <h1 className="modal-body-heading-title">Are you sure you want to
                            refund this ticket?</h1>
                        <p>If this was a mistake cancel request otherwise complete refund.</p>
                        <p>All refunds are final.</p>
                        <Stack direction="horizontal" className='split-row'>
                            <span>Amount to be refunded</span>
                            <span className='amount'>{formatCurrency(55)}</span>
                        </Stack>
                        <Stack className="btn-group-flex">
                            <Button variant="outline-light" size="lg" className='text-danger' onClick={handleClose}>
                                Cancel refund
                            </Button>
                            <Button variant="primary" size="lg" onClick={submitRefund}>
                                Complete refund
                            </Button>
                        </Stack>
                    </>
                )}

                {step === 2 && (
                    <>
                        <SuccessContainer>
                            <h4 className="modal-body-heading-title">Your refund has been completed!</h4>
                        </SuccessContainer>

                        <p>
                            We have refunded 1/1 orders and deducted $55.00 from your payout. All refunds are final.
                        </p>
                        <Stack direction="horizontal" className='split-row'>
                            <span>Amount refunded</span>
                            <span className='amount'>{formatCurrency(55)}</span>
                        </Stack>
                        <SuccessDisclaimer />
                        <Stack className="btn-group-flex">
                            <Button size="lg" onClick={handleClick}>Return to orders</Button>
                        </Stack>
                    </>
                )}
            </Modal.Body>
        </Modal>

    );
}
