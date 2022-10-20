import React, { Fragment, useState, useLayoutEffect } from 'react';

import { toggleElement } from '../../../utilities/helpers';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { SuccessContainer } from '../SuccessContainer';
import { SuccessDisclaimer } from '../SuccessDisclaimer';
import { DisplayTickets } from '../DisplayTickets';
import { Spinner } from '../../SpinnerContainer/Spinner'

export default function RemoveModal({ handleClose, listing, isRemoving, removeListing }) {

    // 1 - confirmation
    // 2 - success
    const [
        step,
        setStep
    ] = useState(1);

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

    const remove = () => {
        removeListing(listing.id).then(() => {
            setStep(2);

        });
    };

    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Remove listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <Fragment>
                        <h4 className="modal-body-heading-title">
                            Are you sure you want to remove this listing?
                        </h4>
                        <DisplayTickets selectedTickets={listing.tickets} />
                        <Stack className="btn-group-flex">
                            <Button
                                onClick={remove}
                                variant="outline-light"
                                size="lg"
                                className="icon-button text-danger">
                                {isRemoving ? (
                                    <Spinner variant="dark" />
                                ) : (
                                    'Remove'
                                )}
                            </Button>
                            <Button onClick={handleClose} size="lg">
                                Cancel
                            </Button>
                        </Stack>
                    </Fragment>
                )}
                {step === 2 && (
                    <Fragment>
                        <SuccessContainer>
                            <h4 className="modal-body-heading-title">
                                Your listing has been removed!
                            </h4>
                        </SuccessContainer>

                        <p className="small">
                            You can re-list them at anytime on the marketplace. Please go to 'My
                            Events' to view your tickets.
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
