import React, { Fragment, useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import authService from '../../utilities/services/auth.service';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';

import './navigation.scss';
import { SearchBar } from './../SearchBar';
import { MyWallet } from './../MyWallet';

export default function Navigation() {
	const [
		windowSize,
		setWindowSize
	] = useState(window.innerWidth);

	const logo = windowSize < 992 ? mobileLogo : desktopLogo;

	useEffect(() => {
		const changeWindowSize = () => setWindowSize(window.innerWidth);

		window.addEventListener('resize', changeWindowSize);

		return () => window.removeEventListener('resize', changeWindowSize);
	}, []);

	const [
		show,
		setShow
	] = useState(false);

	return (
		<div className="navigation">
			<Navbar collapseOnSelect expand="lg" sticky="top">
				<Container>
					<Navbar.Brand as={NavLink} to="/">
						<img src={logo} alt="blocktickets" />
					</Navbar.Brand>
					<Stack direction="horizontal" className="desktop-btns gap-lg-3">
						<SearchBar />
						<div className="cart">
							<Button variant="default">
								<img src={shoppingCart} />
							</Button>
						</div>
						{!authService.isLoggedIn() && (
							<Button href="/login" variant="primary" className="desktop-only">
								Login
							</Button>
						)}
						{authService.isLoggedIn() && (
							<Fragment>
								<Button
									onClick={() => {
										setShow(!show);
									}}
									variant="outline-light"
									className="desktop-only">
									My Wallet
								</Button>

								<div className="desktop-only">
									{show && <MyWallet style="dropdown" />}
								</div>
							</Fragment>
						)}
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					</Stack>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav className="pt-5 pb-3 justify-content-between py-lg-0">
							<div>
								<ul>
									<li>
										<Nav.Link as={NavLink} to="/">
											Browse
										</Nav.Link>
									</li>
								</ul>
								{authService.isLoggedIn() && (
									<ul className="mobile-only">
										<li>
											<MyWallet />
										</li>
									</ul>
								)}
							</div>

							{!authService.isLoggedIn() && (
								<Button variant="primary" href="/login" className="mobile-only">
									Login
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
