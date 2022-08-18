import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { Guest } from './Guest'
import { WarningContainer } from '../../WarningContainer';
import { DeleteModal } from './DeleteModal';

export default function GuestList() {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    let guests = [
        {
            name: 'Harrison Cogan',
            email: 'harrison@gmail.com',
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
                                <span>Name</span>
                            </div>
                            <div className="list-table-col list-table-col-header lg-2" role="columnheader">
                                <span>Email</span>
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
                    <WarningContainer>
                        <p>There are no guests, create a guest to add them to the guest list.</p>
                    </WarningContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
