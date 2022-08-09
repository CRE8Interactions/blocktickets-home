import React from 'react';

import Table from "react-bootstrap/Table";

import { AttendeeRow } from './AttendeeRow';

export default function AttendeeTable({ attendees }) {

    return (
        <>
            <div className="table-container full-width-table">
                <Table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Ticket type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map(attendee => (
                            <AttendeeRow key={attendee.id} attendee={attendee} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
