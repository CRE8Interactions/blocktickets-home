import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { useWindowSize } from '../../utilities/hooks';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';

import './navigation.scss';

export default function Navigation() {
    const windowSize = useWindowSize();

    const logo = windowSize < 992 ? mobileLogo : desktopLogo;

    // remove full height when opened because mobile nav wasn't working properly with full height pages 
    const toggleOverflow = (expanded) => {
        if (expanded) {
            document.body.classList.remove('full-height')
        }
        else {

            document.body.classList.add('full-height')
        }
    };

    return (
        <div className="navigation position-sticky">
            <Navbar collapseOnSelect expand="lg" onToggle={(expanded) => toggleOverflow(expanded)}>
                <Container>
                    <LinkContainer to="/" id="logo-link">
                        <Navbar.Brand>
                            <img src={logo} alt="blocktickets" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" className="pe-0" />
                    <Navbar.Collapse id="responsive-navbar-nav align-items-center">
                        <Nav className="py-lg-0" as="nav">
                            <ul
                                id="main"
                                role="main-navigation"
                                className="d-flex flex-column flex-lg-row align-items-lg-center">
                                <li>
                                    <LinkContainer to="/">
                                        <Nav.Link>About us</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <LinkContainer to="/team">
                                        <Nav.Link>Team</Nav.Link>
                                    </LinkContainer>
                                </li>
                                <li>
                                    <LinkContainer to="/sell">
                                        <Nav.Link>Sell</Nav.Link>
                                    </LinkContainer>
                                </li>
                            </ul>
                        </Nav>
                        <Nav className="py-lg-0 d-flex ms-lg-auto" as="nav">
                            <ul className='d-flex flex-lg-row'>
                                <li>
                                    <LinkContainer to="/sell" className="btn btn-secondary">
                                        <Nav.Link>Request Demo</Nav.Link>
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
