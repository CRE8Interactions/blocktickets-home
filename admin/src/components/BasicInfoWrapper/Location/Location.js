import React from 'react';

import Form from 'react-bootstrap/Form';

export default function Location({ handleChange }) {
    return (
        <Form>
            <Form.Group className="form-group" controlId="venue">
                <Form.Label>Venue</Form.Label>
                <Form.Control type="text" disabled defaultValue="Southside Music Hall" />
            </Form.Group>

            <Form.Group className="form-group" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue="1135 Botham Jean Blvd, Dallas, TX"
                    disabled
                />
            </Form.Group>

            <Form.Group className="form-group" controlId="timezone">
                <Form.Label>Timezone</Form.Label>
                <Form.Select onChange={(e) => handleChange(e)} required>
                    <option value="1">(GMt-0400) United States (New York) Time</option>
                    <option value="2">(GMt-0400) United States (New York) Time</option>
                    <option value="3">(GMt-0400) United States (New York) Time</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="language">
                <Form.Label>Event page language</Form.Label>
                <Form.Select onChange={(e) => handleChange(e)} required>
                    <option value="1">English (US)</option>
                    <option value="2">English (US)</option>
                    <option value="3">English (US)</option>
                </Form.Select>
            </Form.Group>
        </Form>
    );
}
