import React from 'react';
import DatePicker from 'react-datepicker';

export default function DateInput({ id, setDate, selectedDate, startDate, endDate }) {
    return (
        <DatePicker
            showPopperArrow={false}
            id={id}
            selected={selectedDate}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            wrapperClassName="date-picker"
            calendarClassName='calendar-container'
            popperClassName='popper-container'

        />
    );
}
