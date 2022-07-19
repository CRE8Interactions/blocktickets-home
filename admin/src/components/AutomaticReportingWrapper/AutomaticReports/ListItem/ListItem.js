import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { formatString } from '../../../../utilities/helpers';

import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MoreIcon } from '../../../MoreIcon';

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
                <Dropdown className='btn-more'>
                    <Dropdown.Toggle variant="default">
                        <MoreIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <ul>
                            <li>
                                <LinkContainer to={`edit?id=001}`}>
                                    <Dropdown.Item className="btn-edit">Edit</Dropdown.Item>
                                </LinkContainer>
                            </li>
                            <li>
                                <Dropdown.Item as="button" className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                            </li>
                        </ul>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
}
