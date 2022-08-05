import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GuestInfo({ ticketTypeOpt, guest, handleChange, isQuantityValid, validQuantity }) {

    return (
        <Form>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='firstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="First Name"
                            value={guest.firstName} onChange={handleChange} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="form-group" controlId='lastName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Last name"
                            value={guest.lastName} onChange={handleChange} required />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="form-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email address" value={guest.email} onChange={handleChange} required />
            </Form.Group>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='quantity'>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity"
                            pattern="^[0-9]*$" placeholder="Enter quantity"
                            value={guest.quantity}
                            onBlur={validQuantity}
                            onChange={(e) => handleChange(e.target.value === '' || e.target.validity.valid ? e : guest.quantity)}
                            required
                            className={`${guest.quantity && !isQuantityValid ? 'error-border' : ''}`}
                        />
                        {guest.quantity && !isQuantityValid && (
                            <Form.Text className="text-danger">Your requested ticket quantity is not available</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='ticketType'>
                        <Form.Label>Ticket type</Form.Label>
                        <Form.Select name="ticketType" onChange={handleChange} value={guest.ticketType}>
                            {ticketTypeOpt.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
