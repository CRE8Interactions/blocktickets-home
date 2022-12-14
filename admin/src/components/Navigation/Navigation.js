import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'

import { formatString } from '../../utilities/helpers';
import { useWindowSize } from '../../utilities/hooks';

import AuthService from '../../utilities/services/auth.service';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';

import './navigation.scss';

export default function Navigation({ user }) {
    const windowSize = useWindowSize();
    const navigate = useNavigate();
    const [org, setOrg] = useState()

    useEffect(() => {
        if (user) {
            let org = sessionStorage.getItem('org');
            if (org) setOrg(JSON.parse(org)[0])
        } else {
            setOrg('')
        }
    }, [user])

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

    const displayName = (user) => {
        if (user?.user) return formatString(`${user?.user?.firstName} ${user?.user?.lastName}`);
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
                    {AuthService.isLoggedIn() && org &&
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
                                            <LinkContainer to="/">
                                                <Nav.Link>Events</Nav.Link>
                                            </LinkContainer>
                                        </li>
                                    </ul>
                                </Nav>
                            </Navbar.Collapse>
                            <DropdownButton title={org?.name} variant="info" id="org-dropdown">
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
                                <p className='name fw-medium'>{displayName(user)}</p>
                            </DropdownButton>
                        </>
                    }
                </Container>
            </Navbar>
        </div>
    );
}
