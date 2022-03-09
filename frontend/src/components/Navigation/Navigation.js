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

	const [
		expanded,
		setExpanded
	] = useState(false);

	const logo = windowSize < 992 ? mobileLogo : desktopLogo;

	useEffect(
		() => {
			const changeWindowSize = () => setWindowSize(window.innerWidth);

			window.addEventListener('resize', changeWindowSize);

			const originalStyle = window.getComputedStyle(document.body).overflow;

			if (expanded) document.body.style.overflow = 'hidden';

			return () => {
				window.removeEventListener('resize', changeWindowSize);
				document.body.style.overflow = originalStyle;
			};
		},
		[
			expanded
		]
	);

	return (
		<div className="navigation position-sticky">
			<Navbar collapseOnSelect expand="lg">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} alt="blocktickets" />
						</Navbar.Brand>
					</LinkContainer>
					<Stack direction="horizontal" className="desktop-btns gap-3 gap-lg-4">
						<SearchBar />
						<div className="cart">
							<Button variant="default" className="btn--icon">
								<img src={shoppingCart} />
							</Button>
						</div>
						<NavButtons styles="desktop-only" />
						<Navbar.Toggle
							aria-controls="responsive-navbar-nav"
							className="btn-icon"
							onClick={() => setExpanded(!expanded)}
						/>
					</Stack>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav activeKey={window.location.pathname} className="py-lg-0">
							<ul>
								<LinkContainer to="/">
									<Nav.Link>Browse</Nav.Link>
								</LinkContainer>
							</ul>
							{authService.isLoggedIn() && (
								<ul className="mobile-only">
									<li className="pt-2">
										<MyWallet />
									</li>
								</ul>
							)}
							<NavButtons styles="mobile-only" />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
