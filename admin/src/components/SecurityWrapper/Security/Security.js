import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import { InfoIcon } from '../../InfoIcon';
import { PasswordInput } from '../../PasswordInput';
import { Error } from '../../Error';
import { Success } from '../../Success';

import './security.scss';

export default function Security({ info, handleInfo, handleUpdate, handleInput, error, success }) {

    return (
        <div id="security">
            <div className='section-header'>
                <h1 className='normal'>Personal details</h1>
                <h2 className='small fw-normal text-muted'>This information is not visible to the public.</h2>
            </div>
            <Form className='form-group'>
                <Row>
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={info.firstName}
                                onChange={handleInfo}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={info.lastName}
                                onChange={handleInfo}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="outline-light" size="lg" className="update-btn mt-4" disabled={info.firstName === '' || info.lastName === ''} onClick={() => handleUpdate('name')}>Update name</Button>
                {success.includes('name') && (
                    <Success field='name' />
                )}
            </Form>
            <Form className='form-group'>
                <fieldset>
                    <legend>Change email</legend>
                    <Row>
                        <Col>
                            <Form.Group controlId="curEmail">
                                <Form.Label>Current email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="curEmail"
                                    placeholder="Enter current email"
                                    value={info.curEmail}
                                    onBlur={handleInput}
                                    onChange={handleInfo}
                                    required
                                    className={`${error?.field === 'current email' ? 'error-border' : ''}`}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="email">
                                <Form.Label>New Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter new email"
                                    value={info.email}
                                    onChange={handleInfo}
                                    onBlur={handleInput}
                                    required
                                    className={`${error?.field === 'new email' ? 'error-border' : ''}`}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
                {error?.field === 'current email' && (
                    <Error field={error.field} type={error.type} />
                )}
                {error?.field === 'new email' && (
                    <Error field={error.field} type={error.type} />
                )}
                <Button variant="outline-light" size="lg" className="update-btn mt-4" disabled={info.curEmail === '' || info.email === '' || error?.field === "new email"} onClick={() => handleUpdate('email')}>Update email</Button>
                {success.includes('email') && (
                    <Success field='email' />
                )}
            </Form>
            <Form className='form-group'>
                <fieldset>
                    <legend>Change password</legend>
                    <Row>
                        <Col>
                            <Form.Group controlId="curPassword">
                                <Form.Label>Current password</Form.Label>
                                <PasswordInput
                                    name="curPassword"
                                    placeholder="Enter current password"
                                    value={info.curPassword}
                                    handlePassword={handleInfo}
                                    onBlur={handleInput}
                                    isValid={error?.field !== 'current password'}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="password">
                                <div className="form-label--flex">
                                    <Form.Label>New password</Form.Label>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Minimum 8 characters, one upper and lower case & one symbol</Tooltip>}>
                                        <Button variant="link">
                                            <InfoIcon />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                                <PasswordInput
                                    name="password"
                                    placeholder="Enter new password"
                                    value={info.password}
                                    handlePassword={handleInfo}
                                    onBlur={handleInput}
                                    isValid={error?.field !== 'new password'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
                {error?.field === 'current password' && (
                    <Error field={error.field} type={error.type} />
                )}
                {error?.field === 'new password' && (
                    <Error field={error.field} type={error.type} />
                )}
                <Button variant="outline-light" size="lg" className="update-btn mt-4" disabled={info.curPassword === '' || info.password === '' || error?.field === "new password"} onClick={() => handleUpdate('password')}>Update password</Button>
            </Form>
            {success.includes('password') && (
                <Success field='password' />
            )}
        </div>
    );
}
