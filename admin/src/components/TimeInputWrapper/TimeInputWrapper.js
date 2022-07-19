import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { TimeInput } from './TimeInput';

export default function TimeInputWrapper({ label, id, setDate, selectedDate, size }) {

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <Form.Group>
            <div className={`date-picker-card time-picker-card ${size ? `date-picker-card-${size}` : ''}`} >
                <Stack>
                    {label && (<Form.Label htmlFor={id}>{label}</Form.Label>)}
                    <TimeInput id={id} setDate={setDate} selectedDate={selectedDate} filterPassedTime={filterPassedTime} />
                </Stack>
            </div>
        </Form.Group>
    );
}
