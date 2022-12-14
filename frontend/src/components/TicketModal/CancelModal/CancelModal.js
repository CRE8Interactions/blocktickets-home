import React, { Fragment, useState, useLayoutEffect } from 'react';

import { cancelMyTransfers } from '../../../utilities/api';
import { toggleElement } from '../../../utilities/helpers';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { DisplayTickets } from '../DisplayTickets';
import { Spinner } from "../../SpinnerContainer/Spinner"

export default function CancelModal({ handleClose, transfer, getMyTransfers }) {
    // 1 - confirmation
    // 2 - success
    const [
        step,
        setStep
    ] = useState(1);

    const [isSaving, setIsSaving] = useState(false)

    useLayoutEffect(() => {
        let el = document.querySelector('.btn-close');

        if (el) {
            if (step === 2)
                toggleElement(el, false)

            return () => {
                toggleElement(el, true)
            }
        };
    }, [step])

    const cancel = () => {
        setIsSaving(true)
        cancelMyTransfers({ data: { transferId: transfer.id } })
            .then((res) => {
                setIsSaving(false)
                setStep(2);
                getMyTransfers()
            })
            .catch((err) => {
                setIsSaving(false)
                console.error(err)
            })
    };

    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Cancel transfer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <Fragment>
                        <div className="modal-body-heading">
                            <h4 className="modal-body-heading-title">
                                Are you sure you want to cancel this transfer?
                            </h4>
                            <DisplayTickets selectedTickets={transfer?.tickets} />
                        </div>
                        <div>
                            <p className="fw-medium text-muted mb-2">Recipient phone number</p>
                            <span className="fs-md fw-bold">{transfer?.phoneNumberToUser}</span>
                        </div>
                        <Stack className="btn-group-flex">
                            <Button
                                onClick={cancel}
                                variant="outline-light"
                                size="lg"
                                className="icon-button text-danger">
                                {isSaving ? (
                                    <Spinner variant='dark' />
                                ) : (
                                    'Cancel transfer'
                                )}
                            </Button>
                            <Button onClick={handleClose} size="lg">
                                Go back
                            </Button>
                        </Stack>
                    </Fragment>
                )}
                {step === 2 && (
                    <Fragment>
                        <SuccessContainer>
                            <h4 className="modal-body-heading-title">
                                Your transfer has been canceled!
                            </h4>
                        </SuccessContainer>

                        <p className="small">
                            You can view your tickets in 'My Events' and transfer / sell them at
                            anytime.
                        </p>
                        <SuccessDisclaimer />
                        <Stack direction="horizontal" className="btn-group-flex">
                            <Button onClick={handleClose} size="lg">
                                Close
                            </Button>
                        </Stack>
                    </Fragment>
                )}
            </Modal.Body>
        </Fragment>
    );
}
