import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';

import { MessageRow } from './MessageRow'
import { WarningContainer } from '../../WarningContainer';
import { DeleteModal } from './DeleteModal';

export default function ContactAttendees() {

    const [
        key,
        setKey
    ] = useState('scheduled');

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    let contacts = [
        {
            emailText: 'Reminder for Pete Davidson Live !!',
            recipients: '23',
            date: '2 days before event'
        }
    ];

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Nav as="ul" variant="pills" justify>
                        <Nav.Item as="li">
                            <Nav.Link as="button" eventKey="scheduled">
                                Scheduled
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as="button" eventKey="sent">
                                Sent
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Tab.Container>
                <Link to='add' className="btn btn-lg btn-primary ms-auto">Contact attendees</Link>
            </Stack>
            {contacts && contacts.length > 0 ? (
                <div className="table-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>Email / Text</th>
                                <th>Recipients</th>
                                <th>Date</th>
                                {key === "scheduled" && <th>Quick links</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <MessageRow key={index} contact={contact} handleShow={handleShow} show={key === 'scheduled'} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <WarningContainer style="sm">
                    <p>Nothing has been {key}, click Contact attendees to schedule or send a text / email.</p>
                </WarningContainer>
            )}

            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
