import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './createRole.scss';

export default function CreateRoleModal({ show, handleClose, permissions, id, role, setRole, isCheck, handleCheck, handleCreate }) {
    return (
        <Modal id="create-role" centered animation={false} backdrop="static" fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h4">{id ? 'Edit' : 'New'} role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Role name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </Form.Group>
                <h2 className="fs-md">Permissions</h2>
                <Form.Check
                    label="Select all"
                    type="checkbox"
                    id="select_all"
                />

                <ul>
                    <li className='list'>
                        <p className='heading'>Settings</p>
                        <ul>
                            {Object.values(permissions.settings).map(({ id, name }) => (
                                <li key={id}>
                                    <Form.Check
                                        type="checkbox"
                                        label={name}
                                        id={id}
                                        onChange={handleCheck}
                                        defaultChecked={isCheck.includes(id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <Stack direction="horizontal" className="btn-group-flex"><Button size="lg" onClick={handleCreate}>Save {!id && 'and create'} role</Button></Stack>
            </Modal.Body>
        </Modal>

    );
}
