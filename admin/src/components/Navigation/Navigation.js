import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import authService from '../../utilities/services/auth.service';
import { useWindowSize } from '../../utilities/hooks';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';

import { IconButton } from '../IconButton';

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
				<Container>
					<LinkContainer to="/" id="logo-link">
						<Navbar.Brand>
							<img src={logo} alt="blocktickets" />
						</Navbar.Brand>
					</LinkContainer>
					<Stack direction="horizontal" className="desktop-btns">
						<NavDropdown id="nav-dropdown-dark-example" title="Organization name" menuVariant="dark">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" className="pe-0" />
					</Stack>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav activeKey={window.location.pathname} className="py-lg-0" as="nav">
							<ul id="main" role="main-navigation" className="d-flex flex-column flex-lg-row">
								<li>
									<IconButton variant="primary" size="sm">
										Create an event
									</IconButton>
								</li>
								<li>
									<LinkContainer to="/">
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
