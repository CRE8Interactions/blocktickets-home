import React from 'react';

import Form from 'react-bootstrap/Form';

export default function Location({ event, handleChange, timezoneOpt, venues }) {
    return (
        <Form>
            <Form.Group className="form-group" controlId="venue">
                <Form.Label>Venue</Form.Label>
                <Form.Select name="venue" value={event?.venue} onChange={handleChange}>
                    <option disabled value="" hidden>Select venue</option>
                    {venues && venues.map((option, index) => (
                        <option key={index} value={option.id}>{option?.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="timezone">
                <Form.Label>Timezone</Form.Label>
                <Form.Select name="timezone" value={event.timezone} onChange={handleChange}>
                    {timezoneOpt.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
}
