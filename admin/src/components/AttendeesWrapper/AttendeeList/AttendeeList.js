import React, { useState } from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";

import { SearchBar } from '../../SearchBar';
import { ExportBtn } from "../../ExportBtn";
import { Attendee } from './Attendee';

export default function AttendeeList() {

    const listOpt = [
        {
            label: "All",
            value: 'all'
        },
        {
            label: "Check in",
            value: 'check_in'
        },
        {
            label: "Checked in",
            value: 'checked_in'
        },
    ]

    const [attendees, setAttendees] = useState([
        {
            id: 1,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 2,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 3,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 4,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: 'checked_in'
        },
        {
            id: 5,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: 'checked_in'
        },
        {
            id: 6,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 7,
            firstName: 'Arrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 8,
            firstName: 'Barrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 9,
            firstName: 'Barrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 10,
            firstName: 'Barrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: 'checked_in'
        },
        {
            id: 11,
            firstName: 'Barrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 12,
            firstName: 'Barrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
        {
            id: 13,
            firstName: 'Harrison',
            lastName: 'Cogan',
            phoneNumber: '4168095557',
            email: 'harrison.cogan@gmail.com',
            ticketType: 'General Admission',
            checked_in: false
        },
    ])

    const [filter, setFilter] = useState(listOpt[0].value)

    const [query, setQuery] = useState('')

    const handleSearch = (query) => { }

    const handleToggle = id => {
        setAttendees(prevState => {
            let attendees = [...prevState];
            let indexOfAttendee = attendees.findIndex(attendee => attendee.id === id);
            attendees[indexOfAttendee] = {
                ...attendees[indexOfAttendee],
                checked_in: !attendees[indexOfAttendee].checked_in
            };
            return attendees;
        })
    }

    return (
        <>
            <header className="section-header">
                <div className='actions-group-flex'>
                    <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} placeholder="Search by name, phone number or email" />
                    <FloatingLabel controlId="list-status" label="List status">
                        <Form.Select value={filter} onChange={setFilter}>
                            {listOpt.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>

                    <ExportBtn />
                </div>
            </header>
            <Stack as="ul" gap={3}>
                {attendees.map(attendee => (
                    <Attendee key={attendee.id} attendee={attendee} handleToggle={handleToggle} />
                ))}
            </Stack>

        </>

    );
}
