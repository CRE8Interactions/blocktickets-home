import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './deleteModal.scss';

export default function DeleteModal({ show, handleClose }) {
    return (
        <Modal id="delete-modal" centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Body>
                <h1 className="modal-body-heading-title">Are you sure you want to delete this ticket?</h1>
                <p>You will not be able to restore this action</p>
                <Stack className="btn-group-flex">
                    <Button variant="outline-light" size="lg" className='text-danger'>
                        Delete ticket
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack>
            </Modal.Body>
        </Modal>

    );
}
