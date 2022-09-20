import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'

import { Guest } from './Guest'
import { EmptyContainer } from '../../EmptyContainer';
import { DeleteModal } from './DeleteModal';

export default function GuestList() {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    let guests = [
        {
            firstName: 'Harrison',
            lastName: "Cogan",
            phoneNumber: 4168095557,
            quantity: 24,
            ticketType: 'General Admissions'
        }
    ];

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Link to='add' className="btn btn-outline-light btn-lg btn-plus btn-plus--dark ms-auto">Add guest</Link>
            </Stack>
            {guests && guests.length > 0 ? (
                <div className="table-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone number</th>
                                <th>Quantity</th>
                                <th>Ticket type</th>
                                <th>Status</th>
                                <th>Quick links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((guest, index) => (
                                <Guest key={index} guest={guest} />
                            ))}
                        </tbody>
                    </Table>
                </div>

            ) : (
                <EmptyContainer>
                    <p>No guest list created, click Add guests to create a list.</p>
                </EmptyContainer>
            )}
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
