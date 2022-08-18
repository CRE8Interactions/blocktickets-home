import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { Recipient } from './Recipient'
import { WarningContainer } from '../../WarningContainer';
import { DeleteModal } from './DeleteModal';

export default function AutomaticReports() {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    let attendees = [{
        name: 'harrison_cogan',
        email: 'harrison.cogan@gmail.com'
    }];

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Link to='add' className="btn btn-outline-light btn-lg btn-plus btn-plus--dark ms-auto">Add recipient</Link>
            </Stack>
            <Card body>
                {attendees && attendees.length > 0 ? (
                    <div className="list-table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header lg' role="columnheader">
                                <span>Name</span>
                            </div>
                            <div className="list-table-col list-table-col-header lg" role="columnheader">
                                <span>Email</span>
                            </div>
                        </div>
                        {attendees.map((attendee, index) => (
                            <Recipient key={index} attendee={attendee} handleShow={handleShow} />
                        ))}
                    </div>

                ) : (
                    <WarningContainer>
                        <p>Nothing is scheduled, click Add recipient to schedule an automatic report.</p>
                    </WarningContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
