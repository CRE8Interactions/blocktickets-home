import React from 'react';

import { formatString } from '../../../../utilities/helpers';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { EditDeleteDropdown } from '../../../EditDeleteDropdown';

export default function ListItem({ attendee, handleShow }) {

    return (
        <Row as="li">
            <Col md={5} className='list-table-col'>
                {formatString(attendee.name)}
            </Col>
            <Col md={6} className="list-table-col">
                {attendee.email}
            </Col>
            <Col className="btn-more-col list-table-col">
                <EditDeleteDropdown handleShow={handleShow} link={'edit?id=001'} />
            </Col>
        </Row>
    );
}
