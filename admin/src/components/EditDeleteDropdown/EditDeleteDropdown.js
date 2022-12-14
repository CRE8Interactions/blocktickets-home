import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../MoreIcon';

export default function EditDeleteDropdown({ handleShow, canEdit = true, canDelete = true, link, search, hasPermission = true }) {
    return (
        <Dropdown className='btn-more' drop="start">
            <Dropdown.Toggle variant="default" id="btn-more-toggle">
                <MoreIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Stack as="ul" gap={2}>
                    {canEdit && (
                        <li className='w-100'>
                            <LinkContainer to={{
                                pathname: link,
                                search
                            }}>
                                <Dropdown.Item className={`btn-edit ${!hasPermission ? 'btn-link-disabled' : ''}`}>Edit</Dropdown.Item>
                            </LinkContainer>
                        </li>
                    )}
                    {canDelete && (
                        <li className='w-100'>
                            <Dropdown.Item as="button" className="btn-delete" onClick={handleShow}>Delete</Dropdown.Item>
                        </li>
                    )}
                </Stack>
            </Dropdown.Menu>
        </Dropdown>
    );
}
