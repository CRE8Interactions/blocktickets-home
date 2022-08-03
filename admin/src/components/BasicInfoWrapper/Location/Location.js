import React from 'react';

import Form from 'react-bootstrap/Form';

export default function Location({ event, handleChange, timezoneOpt, langOpt }) {
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
                <Form.Select name="timezone" value={event.timezone} onChange={handleChange}>
                    {timezoneOpt.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="language">
                <Form.Label>Event page language</Form.Label>
                <Form.Select value={event.language} name="language" onChange={handleChange}>
                    {langOpt.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
}
