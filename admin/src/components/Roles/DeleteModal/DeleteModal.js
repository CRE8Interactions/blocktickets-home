import React from 'react';
import { removeRoles } from '../../../utilities/api';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function DeleteModal({ show, handleClose, id, setRoles }) {

    const removeRole = (id) => {
        removeRoles({ data: { roleId: id } })
            .then((res) => { setRoles(res.data); handleClose() })
            .catch((err) => console.error(err))
    }
    return (
        <Modal id="delete-modal" centered animation={false} fullscreen="md-down" show={show} onHide={handleClose} backdrop="static">
            <Modal.Body>
                <h1 className="modal-body-heading-title">Are you sure you want to delete this role?</h1>
                <p>You will not be able to restore this action</p>
                <Stack className="btn-group-flex">
                    <Button variant="outline-light" size="lg" className='text-danger' onClick={() => removeRole(id)}>
                        Delete
                    </Button>
                    <Button size="lg" onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack>
            </Modal.Body>
        </Modal>

    );
}
