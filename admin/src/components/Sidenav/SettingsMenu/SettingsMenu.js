import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';

export default function SettingsMenu() {

    return (
        <Stack as="ul" className='mt-5 mb-3'>
            <Nav.Item as="li">
                <LinkContainer to="organization-information">
                    <Nav.Link>Organization info</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="team-management">
                    <Nav.Link>Team management</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="security">
                    <Nav.Link>Security</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="payment-information">
                    <Nav.Link>Payment information</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="payouts">
                    <Nav.Link>Payouts</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="tax-status">
                    <Nav.Link>Tax status</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Stack>
    )
}