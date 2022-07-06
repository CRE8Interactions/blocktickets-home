import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { DateInput } from './DateInput';

export default function DateInputWrapper({ label, id, setDate, selectedDate, startDate, endDate, error }) {
    return (
        <Form.Group>
            <div className={`date-picker-card day-picker-card ${error ? 'error-border' : ''}`}>
                <Stack>
                    <Form.Label htmlFor={id} className={`${error ? 'error' : ''}`}>{label}</Form.Label>
                    <DateInput id={id} setDate={setDate} selectedDate={selectedDate} startDate={startDate} endDate={endDate} />
                </Stack>
            </div>
            {error && (<Form.Text className='error'>End date must be after start date</Form.Text>)}
        </Form.Group>
    );
}
