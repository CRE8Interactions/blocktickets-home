import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function DateTime({ handleChange }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])


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
        </Form>
    );
}
