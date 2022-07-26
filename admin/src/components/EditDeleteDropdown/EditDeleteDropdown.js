import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../MoreIcon';

export default function EditDeleteDropdown({ handleShow, link, onClick }) {

    return (
        <Dropdown className='btn-more'>
            <Dropdown.Toggle variant="default">
                <MoreIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <ul>
                    {link && (
                        <li>
                            <LinkContainer to={link}>
                                <Dropdown.Item className="btn-edit">Edit</Dropdown.Item>
                            </LinkContainer>
                        </li>
                    )}
                    {onClick && (
                        <li>
                            <Dropdown.Item as="button" className="btn-edit" onClick={onClick}>Edit</Dropdown.Item>
                        </li>
                    )}
                    <li>
                        <Dropdown.Item as="button" className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                    </li>
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
