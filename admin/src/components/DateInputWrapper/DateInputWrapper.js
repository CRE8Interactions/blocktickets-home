import React, { useEffect, useRef } from 'react';
import moment from 'moment'

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import { DateInput } from './DateInput';

export default function DateInputWrapper({ label, id, setDate, selectedDate, startDate, endDate, setEndDate, setError, error, size, displayEndDate = false }) {

    const inputRef = useRef();

    // make end date the same as start date when start date changes 
    useEffect(() => {
        if (setEndDate) {
            // create a moment object
            const dateObj = moment(endDate)

            // do changes on that object
            dateObj.set('year', moment(startDate).year());
            dateObj.set('month', moment(startDate).month());
            dateObj.set('date', moment(startDate).date());

            setEndDate(new Date(dateObj))
        }

    }, [startDate])

    // start and end date validation only if end date is displayed 
    useEffect(() => {
        if (displayEndDate) {
            setError(endDate.getTime() <= startDate.getTime())
        } else {
            if (setError) {
                setError(false);
            }
        }
    }, [startDate, endDate, displayEndDate])

    return (
        <Form.Group>
            <div className={`date-picker-card day-picker-card ${size ? `date-picker-card-${size}` : ''} ${error ? 'error-border' : ''}`} ref={inputRef}>
                <Stack>
                    {label && (<Form.Label htmlFor={id} className={`${error ? 'error' : ''}`}>{label}</Form.Label>)}
                    <DateInput id={id} setDate={setDate} selectedDate={selectedDate} startDate={startDate} endDate={endDate} reference={inputRef} />
                </Stack>
            </div>
            {error && (
                <Form.Text className='error'>End date must be after start date</Form.Text>
            )}
        </Form.Group>
    );
}
