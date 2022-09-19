import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

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
            <Card body>
                {guests && guests.length > 0 ? (
                    <div className="list-table four-col" role="table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header lg-2' role="columnheader">
                                <span>First name</span>
                            </div>
                            <div className='list-table-col list-table-col-header lg-2' role="columnheader">
                                <span>Last name</span>
                            </div>
                            <div className="list-table-col list-table-col-header lg-2" role="columnheader">
                                <span>Phone number</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Quantity</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Ticket type</span>
                            </div>
                        </div>
                        {guests.map((guest, index) => (
                            <Guest key={index} guest={guest} handleShow={handleShow} />
                        ))}
                    </div>

                ) : (
                    <EmptyContainer>
                        <p>No guest list created, click Add guests to create a list.</p>
                    </EmptyContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
