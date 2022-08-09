import React, { useState } from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { SearchBar } from '../../SearchBar';
import { AttendeeTable } from './AttendeeTable';
import { ExportSelect } from "../../ExportSelect";

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

    const [exportTo, setExportTo] = useState()

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

    return (
        <>
            <div className="section-header" id="check-in-attendee-list">
                <Row className='align-items-center actions-group-flex'>
                    <Col className="pe-0" lg={3} xl={2}>
                        <h3 className='fs-md m-0'>Attendee list</h3>
                    </Col>
                    <Col lg={9} xl={5}>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} placeholder="Search by name, phone number or email" />
                    </Col>
                    <Col>
                        <FloatingLabel controlId="list-status" label="List status">
                            <Form.Select value={filter} onChange={setFilter}>
                                {listOpt.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col>
                        <ExportSelect setExportTo={setExportTo} exportTo={exportTo} />
                    </Col>

                </Row>
            </div>
            <AttendeeTable attendees={attendees} />

        </>

    );
}
