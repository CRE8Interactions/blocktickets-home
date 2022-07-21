import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { SuccessContainer } from '../../SuccessContainer'

import './confirmationModal.scss';

export default function ConfirmationModal({ type, choice, show, handleClose }) {

    const navigate = useNavigate();

    const getText = () => {
        return `Your ${type} ${type === 'text' ? 'message' : ''} has been ${choice === '1' ? ' sent' : 'sheduled to send later'}!`
    }

    const handleClick = () => {
        navigate(-1);
        handleClose()
    }

    return (
        <Modal id="confirmation-modal" centered animation={false} fullscreen="md-down" backdrop='static' show={show} onHide={handleClose}>
            <Modal.Body>
                <>
                    <SuccessContainer>
                        <h4 className="modal-body-heading-title">{getText()}</h4>
                    </SuccessContainer>
                    <Stack className="btn-group-flex">
                        <Button size="lg" onClick={handleClick}>Close</Button>
                    </Stack>
                </>
            </Modal.Body>
        </Modal>

    );
}
