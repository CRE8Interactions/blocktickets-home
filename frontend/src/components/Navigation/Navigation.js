import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import authService from '../../utilities/services/auth.service';
import { useWindowSize } from '../../utilities/hooks';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import mobileLogo from '../../assets/logo-mobile.svg';
import desktopLogo from '../../assets/logo.svg';

import { SearchBar } from './SearchBar';
import { MyWallet } from './MyWallet';
import { LoginButton } from './LoginButton';
import { MyWalletButton } from './MyWalletButton';
import { Timer } from './Timer';

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
						<SearchBar />
						<LoginButton styles="desktop-only" />
						<MyWalletButton styles="desktop-only" />
						<Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" className="pe-0" />
					</Stack>
					<Navbar.Collapse id="responsive-navbar-nav align-items-center">
						<Nav activeKey={window.location.pathname} className="py-lg-0" as="nav">
							<ul
								id="main"
								role="main-navigation"
								className="d-flex flex-column flex-lg-row align-items-lg-center">
								<li>
									<LinkContainer to="/">
										<Nav.Link>Browse</Nav.Link>
									</LinkContainer>
								</li>
							</ul>

							{authService.isLoggedIn() && (
								<ul className="mobile-tablet-only" role="wallet-navigation">
									<li className="mt-4">
										<MyWallet />
									</li>
								</ul>
							)}
							<LoginButton styles="mobile-tablet-only" />
						</Nav>
					</Navbar.Collapse>
					<Timer className="d-block" />
				</Container>
			</Navbar>
		</div>
	);
}
