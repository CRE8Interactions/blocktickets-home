import React from 'react';
import DatePicker from 'react-datepicker';

export default function TimeInput({ id, setDate, selectedDate, filterPassedTime, reference }) {
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
                        altBoundary: true,
                        tether: false,
                        tetherOffset: 5
                    },
                },
            ]}
        />
    );
}
