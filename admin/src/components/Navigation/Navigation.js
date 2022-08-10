import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'

import AuthService from '../../utilities/services/auth.service';
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
    const navigate = useNavigate();

    const logo = windowSize < 992 ? mobileLogo : desktopLogo;

    const toggleOverflow = (expanded) => {
        if (expanded) {
            document.body.classList.add('nav-is-open');
        }
        else {
            document.body.classList.remove('nav-is-open');
        }
    };

    const logout = () => {
        AuthService.logoutUser();
        navigate("/");
    }

    return (
        <div className="navigation position-sticky">
            <Navbar collapseOnSelect expand="lg" onToggle={(expanded) => toggleOverflow(expanded)}>
                <Container>
                    <LinkContainer to="/" id="logo-link">
                        <Navbar.Brand>
                            <img src={logo} alt="blocktickets" />
                        </Navbar.Brand>
                    </LinkContainer>
                    {AuthService.isLoggedIn() &&
                        <>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" className="pe-0" />
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
                            <DropdownButton title="Southside Music Hall" variant="info" id="org-dropdown">
                                <Stack as="ul" gap={2}>
                                    <li>
                                        <LinkContainer to="/settings">
                                            <Dropdown.Item >Settings</Dropdown.Item>
                                        </LinkContainer>
                                    </li>
                                    <li>
                                        <Dropdown.Item as="button" onClick={() => logout()}>Logout</Dropdown.Item>
                                    </li>
                                </Stack>
                                <p className='name fw-medium'>Harrison Cogan</p>
                            </DropdownButton>
                        </>
                    }
                </Container>
            </Navbar>
        </div>
    );
}
