import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../../assets/logo.svg';
import './navigation.scss';

export default function Navigation() {
	return (
		<Navbar collapseOnSelect bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/" className="app-name">
					<img src={logo} alt="blocktickets" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll>
						<Nav.Link href="#action1">Browse</Nav.Link>
					</Nav>
					<Nav>
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Search for events"
								className="me-2"
								aria-label="Search"
							/>
							<Button variant="primary">Login</Button>
						</Form>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
