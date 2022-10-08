import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';

import { MoreIcon } from '../MoreIcon';

export default function EditDeleteDropdown({ handleShow, canEdit = true, link, onClick, ticket, hasPermission = true }) {
    return (
        <Dropdown className='btn-more'>
            <Dropdown.Toggle variant="default" id="btn-more-toggle">
                <MoreIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Stack as="ul" gap={2}>
                    {canEdit && (
                        <>
                            {link && (
                                <li className='w-100'>
                                    <LinkContainer to={link}>
                                        <Dropdown.Item className={`btn-edit ${!hasPermission ? 'btn-link-disabled' : ''}`}>Edit</Dropdown.Item>
                                    </LinkContainer>
                                </li>
                            )}
                            {onClick && (
                                <li className='w-100'>
                                    <Dropdown.Item as="button" disabled={!hasPermission} className="btn-edit" onClick={onClick}>Edit</Dropdown.Item>
                                </li>
                            )}
                        </>
                    )}
                    <li className='w-100'>
                        <Dropdown.Item as="button" className="btn-delete" onClick={handleShow} disabled={ticket?.status === "on_sale"}>Delete</Dropdown.Item>
                    </li>
                </Stack>
            </Dropdown.Menu>
        </Dropdown>
    );
}
