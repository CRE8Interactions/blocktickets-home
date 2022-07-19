import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ListItem } from './ListItem'
import { NoDataContainer } from '../../NoDataContainer';
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
                    <div className="list-table report-list">
                        <Row className="list-table-header">
                            <Col md={5} className='list-table-col list-table-col-header'>
                                Name
                            </Col>
                            <Col md={6} className="list-table-col list-table-col-header">
                                Email
                            </Col>
                        </Row>
                        <Stack as="ul">
                            {attendees.map((attendee, index) => (
                                <ListItem key={index} attendee={attendee} handleShow={handleShow} />
                            ))}
                        </Stack>
                    </div>

                ) : (
                    <NoDataContainer>
                        <p>Nothing is scheduled, click Add recipient to schedule an automatic report.</p>
                    </NoDataContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
