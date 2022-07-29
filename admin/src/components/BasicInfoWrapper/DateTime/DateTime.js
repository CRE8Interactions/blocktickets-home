import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function DateTime({ event, handleChange, setStartDate, startDate, setEndDate, endDate, hasError }) {

    return (
        <Form>
            <fieldset className='form-group'>
                <legend>Event starts</legend>
                <Row>
                    <Col>
                        <DateInputWrapper label="Event start" id="event-start" setDate={setStartDate} selectedDate={startDate} startDate={startDate} endDate={endDate} error={hasError} />
                    </Col>
                    <Col>
                        <TimeInputWrapper
                            label="Start time"
                            id="event-start-time"
                            setDate={setStartDate} selectedDate={startDate}
                        />
                    </Col>
                </Row>
            </fieldset>

            <fieldset className="form-group">
                <legend>Event ends</legend>
                <Row>
                    <Col>
                        <DateInputWrapper label='Event end' id="event-end" setDate={setEndDate} selectedDate={endDate} startDate={startDate} endDate={endDate} error={hasError} />

                    </Col>
                    <Col>
                        <TimeInputWrapper
                            label="End time"
                            id="event-end-time"
                            setDate={setEndDate} selectedDate={endDate}
                        />
                    </Col>
                </Row>
            </fieldset>
            <div className="form-group">
                <Form.Check type='checkbox' className="d-flex align-items-center gap-3" id={`check-display-checkbox`}>
                    <Form.Check.Input
                        name="displayEndTime"
                        type='checkbox'
                        defaultChecked={event.displayEndTime}
                        onChange={(e) => { handleChange(e, e.target.checked) }} />
                    <div>
                        <Form.Check.Label id="check-display-checkbox-label" className='mb-1 fw-semi-bold'>Display end time</Form.Check.Label>
                        <small className='d-block text-muted fw-semi-bold'>
                            The end time of your event will be displayed to attendees
                        </small>
                    </div>
                </Form.Check>
            </div>
        </Form>
    );
}
