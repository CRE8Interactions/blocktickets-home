import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './addMember.scss';

export default function AddMemberModal({ show, handleClose, roles, member, handleMember, handleRole, handleAdd, id }) {
    return (
        <Modal id="add-member" centered animation={false} backdrop="static" fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h4">{id ? 'Edit' : 'New'} user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete="off">
                    <Form.Group className="form-group" controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            required
                            value={member?.firstName || ''}
                            onChange={handleMember}
                        />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            required
                            value={member?.lastName || ''}
                            onChange={handleMember}
                        />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            value={member?.email || ''}
                            onChange={handleMember}
                        />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={member?.role?.id || ''}
                            onChange={handleRole}
                            autoComplete="off"
                        >
                            <option key={0}>Select a Role</option>
                            {roles && roles.map((option, index) => (
                                <option key={index} value={option.id}>{option.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="uuid">
                        <Form.Control
                            type="hidden"
                            name="uuid"
                            defaultValue={member ? member?.uuid : ''}
                        />
                    </Form.Group>
                </Form>
                <Stack direction="horizontal" className="btn-group-flex"><Button size="lg" disabled={!member?.firstName || !member?.lastName || !member?.email || !member?.role?.id} onClick={handleAdd}>{id ? 'Save' : 'Add'} user</Button></Stack>
            </Modal.Body>
        </Modal>

    );
}
