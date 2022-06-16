import React from 'react';

import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import { InfoIcon } from '../../InfoIcon';

export default function BasicInfo({ handleChange }) {
    return (
        <Form>
            <Form.Group className="form-group" controlId="presentedBy">
                <Form.Label>Presented By</Form.Label>
                <Form.Control type="text" placeholder="Presented By" onChange={(e) => handleChange(e)} required />
            </Form.Group>

            <Form.Group className="form-group" controlId="title">
                <div className="form-label--flex">
                    <Form.Label>Event Title</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Maximum 100 characters. No HTML or emoji allowed</Tooltip>}>
                        <Button variant="link">
                            <InfoIcon />
                        </Button>
                    </OverlayTrigger>
                </div>
                <Form.Control type="text" placeholder="Event title" onChange={(e) => handleChange(e)} required />
            </Form.Group>

            <Form.Group className="form-group" controlId="eventType">
                <Form.Label>Type of event</Form.Label>
                <Form.Select onChange={(e) => handleChange(e)} required>
                    <option value="1">Concert</option>
                    <option value="2">Music</option>
                    <option value="3">Event</option>
                </Form.Select>
            </Form.Group>
        </Form>
    );
}
