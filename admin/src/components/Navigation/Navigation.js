import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import authService from '../../utilities/services/auth.service';
import { useWindowSize } from '../../utilities/hooks';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';

import './navigation.scss';

export default function Navigation() {
    const windowSize = useWindowSize();

    const logo = windowSize < 992 ? mobileLogo : desktopLogo;

    const toggleOverflow = (expanded) => {
        if (expanded) {
            document.body.classList.add('nav-is-open');
        }
        else {
            document.body.classList.remove('nav-is-open');
        }
    };

    return (
        <div className="navigation position-sticky">
            <Navbar collapseOnSelect expand="lg" onToggle={(expanded) => toggleOverflow(expanded)}>
                <Container className="my-container" id="main-container">
                    <LinkContainer to="/" id="logo-link">
                        <Navbar.Brand>
                            <img src={logo} alt="blocktickets" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Stack direction="horizontal" className="desktop-btns">
                        <DropdownButton title="Organization name" variant="info">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" className="pe-0" />
                    </Stack>
                    <Navbar.Collapse id="responsive-navbar-nav align-items-center">
                        <Nav activeKey={window.location.pathname} className="py-lg-0" as="nav">
                            <ul
                                id="main"
                                role="main-navigation"
                                className="d-flex flex-column flex-lg-row align-items-lg-center">
                                <li>
                                    <LinkContainer
                                        to="/create"
                                        className="btn btn-primary btn-plus icon-button text-white btn-sm">
                                        <Nav.Link>Create an event</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <LinkContainer to="/events">
                                        <Nav.Link>Events</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <LinkContainer to="/">
                                        <Nav.Link>Reports</Nav.Link>
                                    </LinkContainer>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
