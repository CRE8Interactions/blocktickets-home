import React from 'react';

import Form from 'react-bootstrap/Form';

export default function Location({ event, handleChange, venues }) {
    return (
        <Form>
            <Form.Group className="form-group" controlId="venue">
                <Form.Label>Venue</Form.Label>
                <Form.Select name="venue" value={event?.venue?.id || event.venue} onChange={handleChange}>
                    <option key="-1">Select venue</option>
                    {venues && venues.map((option, index) => (
                        <option key={index} value={option?.id}>{option?.name} - {option?.address[0]?.address_1} {option?.address[0]?.city}, {option?.address[0]?.state}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
}