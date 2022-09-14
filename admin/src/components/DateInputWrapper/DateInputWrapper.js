import React, { useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { DateInput } from './DateInput';

export default function DateInputWrapper({ label, id, setDate, selectedDate, startDate, endDate, setEndDate, setError, error, size, displayEventEnd = true }) {

    // make end date the same as start date when start date changes 
    useEffect(() => {
        setEndDate(new Date(startDate))

    }, [startDate])

    // start and end date validation 
    useEffect(() => {
        if (displayEventEnd) {
            setError(endDate.getTime() < startDate.getTime())
        } else {
            setError(false)
        }
    }, [startDate, endDate, displayEventEnd])

    return (
        <Form.Group>
            <div className={`date-picker-card day-picker-card ${size ? `date-picker-card-${size}` : ''} ${error ? 'error-border' : ''}`}>
                <Stack>
                    {label && (<Form.Label htmlFor={id} className={`${error ? 'error' : ''}`}>{label}</Form.Label>)}
                    <DateInput id={id} setDate={setDate} selectedDate={selectedDate} startDate={startDate} endDate={endDate} />
                </Stack>
            </div>
            {error && (
                <Form.Text className='error'>End date must be after start date</Form.Text>
            )}
        </Form.Group>
    );
}
