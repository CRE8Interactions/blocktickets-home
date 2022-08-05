import React from 'react';

import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

import { InfoIcon } from '../../InfoIcon';

export default function BasicInfo({ handleChange, event }) {

    return (
        <Form>
            <Form.Group className="form-group" controlId="presentedBy">
                <Form.Label>Presented By <strong className='text-dark text-lowercase'>(optional)</strong></Form.Label>
                <Form.Control type="text" name="presentedBy" value={event.presentedBy} placeholder="Presented By" onChange={handleChange} />
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
                <Form.Control type="text" name="title" placeholder="Event title" value={event.title} onChange={handleChange} required />
            </Form.Group>
        </Form>
    );
}
