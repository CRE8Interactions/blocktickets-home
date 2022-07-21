import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../../../MoreIcon';

export default function MessageRow({ contact, handleShow, show }) {

    return (
        <tr>
            <td>
                {contact.emailText}
            </td>
            <td>
                {contact.recipients}
            </td>
            <td>
                {contact.date}
            </td>
            {show && (
                <td className="btn-more">
                    <Dropdown align="right">
                        <Dropdown.Toggle variant="default">
                            <MoreIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <ul>
                                <li>
                                    <LinkContainer to={`edit?id=001`}>
                                        <Dropdown.Item className="btn-edit">Edit</Dropdown.Item>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <Dropdown.Item as="button" className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            )}
        </tr>
    );
}
