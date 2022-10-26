import React from 'react';
import DatePicker from 'react-datepicker';

export default function DateInput({ id, setDate, selectedDate, startDate, endDate, reference }) {

    // get min date depending on date input control
    // - if end date input control, block out dates before start date  
    const getMinDate = () => {
        if (id.indexOf('start') !== -1) {
            return new Date()
        } else {
            return startDate
        }
    }
    return (
        <DatePicker
            showPopperArrow={false}
            id={id}
            selected={selectedDate}
            onChange={(date) => setDate(date)}
            minDate={getMinDate()}
            startDate={startDate}
            endDate={endDate}
            wrapperClassName="date-picker"
            calendarClassName='calendar-container'
            popperClassName='popper-container'
            popperModifiers={[
                {
                    name: "offset",
                    options: {
                        offset: ({ placement }) => {
                            if (placement === 'top-start') {
                                return [10, 25]
                            } else {
                                return [];
                            }
                        }
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: reference.current, // align calendar to edge of date card 
                    },
                },
            ]}
        />
    );
}
