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
import SearchBar from './../SearchBar/SearchBar';

export default function Navigation() {
	const { setAuthenticated } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	return (
		<div className="navigation">
			<Navbar collapseOnSelect expand="md">
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt="blocktickets" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
							<Nav.Link href="/">Browse</Nav.Link>
						</Nav>
						<Nav className="gap-4 align-items-md-center">
							<SearchBar />
							<div className="notificatins align-self-md-center">
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
