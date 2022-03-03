import React, { Component, useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import authService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';

import './navigation.scss';
import SearchBar from './../SearchBar/SearchBar';

export default function Navigation() {
	const { setAuthenticated } = useContext(UserContext);
	const [
		windowSize,
		setWindowSize
	] = useState(window.innerWidth);

	const logo = windowSize < 768 ? mobileLogo : desktopLogo;

	useEffect(() => {
		const changeWindowSize = () => setWindowSize(window.innerWidth);

		window.addEventListener('resize', changeWindowSize);

		return () => window.removeEventListener('resize', changeWindowSize);
	}, []);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	return (
		<div className="navigation">
			<Navbar collapseOnSelect expand="lg">
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt="blocktickets" />
					</Navbar.Brand>
					<div className="desktop-btns d-flex gap-md-3 align-items-center">
						<SearchBar />
						<div className="notificatins align-self-md-center">
							<Button variant="default">
								<img src={shoppingCart} />
							</Button>
						</div>
						{!authService.isLoggedIn() && (
							<Button variant="primary" href="/login" className="desktop-only">
								Login
							</Button>
						)}
						{authService.isLoggedIn() && (
							<Button variant="outline-light" className="desktop-only">
								My Wallet
							</Button>
						)}
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					</div>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav className="pt-5 pb-3  justify-content-between py-md-0">
							<ul>
								<li>
									<Nav.Link href="/">Browse</Nav.Link>
								</li>
							</ul>
							{!authService.isLoggedIn() && (
								<Button variant="primary" href="/login" className="mobile-only">
									Login
								</Button>
							)}
						</Nav>
						<Nav className="gap-4 align-items-md-center">
							{/* <SearchBar />
							<div className="notificatins align-self-md-center">
								<img src={shoppingCart} />
							</div> */}
							{/* {!authService.isLoggedIn() && (
								<Button variant="primary" href="/login">
									Login
								</Button>
							)}
							{authService.isLoggedIn() && (
								<Button variant="outline-light">My Wallet</Button>
							)} */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
