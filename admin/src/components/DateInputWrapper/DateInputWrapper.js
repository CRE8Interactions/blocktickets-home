import React, { useEffect }from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { DateInput } from './DateInput';

export default function DateInputWrapper({ label, id, setDate, selectedDate, startDate, endDate, error, size, event }) {

    useEffect(() => {
        
    }, [startDate])

    return (
        <Form.Group>
            <div id={id} className={`date-picker-card day-picker-card ${size ? `date-picker-card-${size}` : ''} ${error ? 'error-border' : ''}`}>
                <Stack>
                    {label && (<Form.Label htmlFor={id} className={`${error ? 'error' : ''}`}>{label}</Form.Label>)}
                    <DateInput id={id} setDate={setDate} selectedDate={selectedDate} startDate={startDate} endDate={endDate} event={event} />
                </Stack>
            </div>
            {error ? (
                <Form.Text className='error'>End date must be after start date</Form.Text>
            ) : (
                <Form.Text id={id} className="error"></Form.Text>
            )}
        </Form.Group>
    );
}
