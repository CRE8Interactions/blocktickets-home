import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './addMember.scss';

export default function AddMemberModal({ show, handleClose, roles, member, handleMember, handleAdd, id }) {
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
                            defaultValue={member? member?.name?.split(' ')[0] : ''}
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
                            defaultValue={member? member?.name?.split(' ')[1] : ''}
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
                            defaultValue={member ? member?.email : ''}
                            onChange={handleMember}
                        />
                    </Form.Group>
                    <Form.Group className="form-group" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            onChange={(e) => handleMember(e)}
                            autoComplete="off"
                            >
                                {!member &&
                                    <option key={0} value=''>Select a Role</option>
                                }
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
                <Stack direction="horizontal" className="btn-group-flex"><Button size="lg" onClick={handleAdd}>{id ? 'Save' : 'Add'} user</Button></Stack>
            </Modal.Body>
        </Modal>

    );
}
