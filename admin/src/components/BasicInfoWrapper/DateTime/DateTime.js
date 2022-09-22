import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function DateTime({ event, handleChange, setEventStart, eventStart, setEventEnd, eventEnd, setDoorsOpen, doorsOpen, setError, error, timeError }) {
    useEffect(() => {
        
    }, [event])
    return (
        <Form>
            <fieldset className='form-group'>
                <legend>Event starts</legend>
                <Row>
                    <Col>
                        <DateInputWrapper label="Event start" id="event-start" setDate={setEventStart} selectedDate={eventStart} startDate={eventStart} endDate={eventEnd}
                            setEndDate={setEventEnd}
                            displayEndDate={!event.hide_end_date}
                            setError={setError}
                            error={error} />
                    </Col>
                    <Col>
                        <TimeInputWrapper
                            label="Start time"
                            id="event-start-time"
                            setDate={setEventStart} selectedDate={eventStart}
                        />
                    </Col>
                </Row>
            </fieldset>
            <div className="mt-3 mb-5">
                <Form.Check type='checkbox' className="d-flex align-items-center gap-3" id="check-display-checkbox">
                    <Form.Check.Input
                        name="hide_start_date"
                        type='checkbox'
                        defaultChecked={!event?.hide_start_date}
                        onChange={(e) => { handleChange(e, !e.target.checked) }} />
                    <div>
                        <Form.Check.Label id="check-display-checkbox-label" className='mb-1 fw-semi-bold'>Display start time</Form.Check.Label>
                        <small className='d-block text-muted fw-semi-bold'>
                            The start time of your event will be displayed to attendees
                        </small>
                    </div>
                </Form.Check>
            </div>
            <Form.Check
                type="switch"
                label="Doors open"
                id="doors"
                name="hide_doors_open"
                checked={!event.hide_doors_open}
                onChange={(e) => { handleChange(e, !e.target.checked) }}
            />
            {!event.hide_doors_open && (
                <fieldset className='form-group'>
                    <legend>Doors open</legend>
                    <Row>
                        <Col>
                            <TimeInputWrapper
                                label="time"
                                id="doors-open-time"
                                setDate={setDoorsOpen} selectedDate={doorsOpen}
                                error={timeError}
                            />
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </fieldset>
            )}

            <Form.Check
                type="switch"
                label="Event ends"
                id="ends"
                name="hide_end_date"
                checked={!event.hide_end_date}
                onChange={(e) => { handleChange(e, !e.target.checked) }}
            />

            {!event.hide_end_date && (
                <fieldset className="form-group">
                    <legend>Event ends</legend>
                    <Row>
                        <Col>
                            <DateInputWrapper label='Event end' id="event-end" setDate={setEventEnd} selectedDate={eventEnd} startDate={eventStart} endDate={eventEnd} displayEndDate={!event.hide_end_date}
                                setEndDate={setEventEnd}
                                setError={setError}
                                error={error} />

                        </Col>
                        <Col>
                            <TimeInputWrapper
                                label="End time"
                                id="event-end-time"
                                setDate={setEventEnd} selectedDate={eventEnd}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </fieldset>
            )}
        </Form>
    );
}
