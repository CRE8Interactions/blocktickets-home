import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './createRole.scss';

export default function CreateRoleModal({ show, handleClose, permissions, id, role, setRole, isCheck, handleSelectAll, handleCheck, handleCreate }) {
    if (permissions.length === 0) return (<div />);
    return (
        <Modal id="create-role" scrollable centered animation={false} backdrop="static" fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h4">{id ? 'Edit' : 'New'} role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Role name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={role ? role?.name : 'Enter Name'}
                        required
                        defaultValue={role ? role?.name : ''}
                        onBlur={(e) => setRole(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-2">
                    <h2 className="fs-md">Permissions</h2>
                    <p className='text-muted fw-medium small mb-4 '>Grant your team members specific permissions to delegate tasks</p>
                    <Form.Check
                        label="Select all"
                        type="checkbox"
                        id="all"
                        onChange={handleSelectAll}
                    />
                </div>

                <ul>
                    <li className='list'>
                        <p className='heading'>Settings</p>
                        <ul>
                            <li>
                                <Form.Check
                                    label="Select all"
                                    type="checkbox"
                                    id="s-0"
                                    name="settings"
                                    onChange={handleSelectAll}
                                />
                            </li>
                            {Object.values(permissions.settings).map(({ id, name }) => (
                                <li key={id}>
                                    <Form.Check
                                        type="checkbox"
                                        label={name}
                                        id={id}
                                        onChange={handleCheck}
                                        checked={isCheck.includes(id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='list'>
                        <p className='heading'>Event oversight</p>
                        <ul>
                            {Object.values(permissions.events).map(({ id, name }) => (
                                <li key={id}>
                                    <Form.Check
                                        type="checkbox"
                                        label={name}
                                        id={id}
                                        onChange={handleCheck}
                                        checked={isCheck.includes(id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='list'>
                        <p className='heading'>Event management</p>
                        <ul>
                            <li>
                                <Form.Check
                                    label="Select all"
                                    type="checkbox"
                                    id="m-0"
                                    name="management"
                                    onChange={handleSelectAll}
                                />
                            </li>
                            {Object.values(permissions.management).map(({ id, name }) => (
                                <li key={id}>
                                    <Form.Check
                                        type="checkbox"
                                        label={name}
                                        id={id}
                                        onChange={handleCheck}
                                        checked={isCheck.includes(id)}
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
