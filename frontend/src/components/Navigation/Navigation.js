import React, { Fragment, useRef, useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import authService from '../../utilities/services/auth.service';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';

import { SearchBar } from './../SearchBar';
import { MyWallet } from './../MyWallet';
import { NavButtons } from './NavButtons';

import './navigation.scss';

export default function Navigation() {
	const [
		windowSize,
		setWindowSize
	] = useState(window.innerWidth);

	const logo = windowSize < 992 ? mobileLogo : desktopLogo;

	const toggleOverflow = (expanded) => {
		document.body.style.overflow = expanded ? 'hidden' : 'visible';
		document.querySelector('.navbar').style.borderWidth = expanded ? '0px' : '1px';
	};
	useEffect(() => {
		const changeWindowSize = () => setWindowSize(window.innerWidth);

		window.addEventListener('resize', changeWindowSize);

		return () => {
			window.removeEventListener('resize', changeWindowSize);
		};
	});

	return (
		<div className="navigation position-sticky">
			<Navbar collapseOnSelect expand="lg" onToggle={(expanded) => toggleOverflow(expanded)}>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} alt="blocktickets" />
						</Navbar.Brand>
					</LinkContainer>
					<Stack direction="horizontal" className="desktop-btns">
						<SearchBar />
						<div className="cart">
							<Button
								variant="default"
								className="btn--icon"
								aria-label="shopping Cart">
								<img
									src={shoppingCart}
									alt="shopping cart"
									width="24"
									height="24"
								/>
							</Button>
						</div>
						<NavButtons styles="desktop-only" />
						<Navbar.Toggle
							aria-controls="responsive-navbar-nav"
							id="toggle"
							className="btn--icon pe-0"
						/>
					</Stack>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav activeKey={window.location.pathname} className="py-lg-0" as="nav">
							<ul id="main" role="main-navigation">
								<li>
									<LinkContainer to="/">
										<Nav.Link>Browse</Nav.Link>
									</LinkContainer>
								</li>
							</ul>

							{authService.isLoggedIn() && (
								<ul className="mobile-tablet-only" role="wallet-navigation">
									<li className="pt-2">
										<MyWallet />
									</li>
								</ul>
							)}
							<NavButtons styles="mobile-tablet-only" />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
