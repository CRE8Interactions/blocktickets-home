import React, { Component, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import logo from '../../assets/logo.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';

import './navigation.scss';

export default function Navigation() {
	const { setAuthenticated } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	return (
		<div className="navigation">
			<Navbar collapseOnSelect expand="lg">
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
						<Nav className="gap-4">
							<Form className="d-flex">
								<FormControl
									type="search"
									placeholder="Search for events"
									className="me-2"
									aria-label="Search"
								/>
							</Form>
							<div className="notificatins align-self-center">
								<img src={shoppingCart} />
							</div>
							{!authService.isLoggedIn() && (
								<Button variant="primary" href="/login">
									Login
								</Button>
							)}
							{authService.isLoggedIn() && (
								<Button variant="outline-light">My Wallet</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
