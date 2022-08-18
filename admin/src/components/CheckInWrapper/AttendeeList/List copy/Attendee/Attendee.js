import React from 'react';

import ListGroup from "react-bootstrap/ListGroup";

import { CheckedInIcon } from '../../Attendees/AttendeeRow/CheckedInIcon';

export default function Attendee({ attendee, setAttendee }) {

    return (
        <li>
            <ListGroup.Item as="button" className='split-row' action onClick={() => setAttendee(attendee)}>
                <div>
                    <p className='fw-medium'>{attendee.firstName} {attendee.lastName}</p>
                    <span className='text-muted'>{attendee.ticketType}</span>
                </div>
                {attendee.checked_in ? (
                    <CheckedInIcon />
                ) : (
                    <span className='fw-semi-bold text-primary'>Check in</span>
                )
                }
            </ListGroup.Item>
        </li>
    );
}
