import React, { useRef } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { TimeInput } from './TimeInput';

export default function TimeInputWrapper({ label, id, setDate, selectedDate, size, error }) {

    const timeRef = useRef();

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <Form.Group>
            <div className={`date-picker-card time-picker-card ${size ? `date-picker-card-${size}` : ''} ${error ? 'error-border' : ''}`} ref={timeRef} >
                <Stack>
                    {label && (<Form.Label htmlFor={id}>{label}</Form.Label>)}
                    <TimeInput id={id} setDate={setDate} selectedDate={selectedDate} filterPassedTime={filterPassedTime} reference={timeRef} />
                </Stack>
            </div>
            {error && (
                <Form.Text id={id} className="error">Doors open time must be before event start time</Form.Text>
            )}
        </Form.Group>
    );
}
