import React from 'react';
import DatePicker from 'react-datepicker';

export default function TimeInput({ id, setDate, selectedDate, filterPassedTime }) {
    return (
        <DatePicker
            showPopperArrow={false}
            id={id}
            selected={selectedDate}
            onChange={(date) => setDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            filterTime={filterPassedTime}
            wrapperClassName="date-picker"
            calendarClassName='calendar-container'
            popperClassName='popper-container'
        />
    );
}
