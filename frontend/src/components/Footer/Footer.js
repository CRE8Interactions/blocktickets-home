import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import { getCopyrightYear } from '../../utilities/helpers';
import InputField from './../InputField/InputField';

import logo from '../../assets/logo.svg';
import facebook from '../../assets/icons/facebook-filled.svg';
import instagram from '../../assets/icons/instagram.svg';
import twitter from '../../assets/icons/twitter-filled.svg';
import tiktok from '../../assets/icons/tiktok-filled.svg';
import discord from '../../assets/icons/discord-filled.svg';

import './footer.scss';

export default function Footer() {
	return (
		<footer id="footer">
			<Row className="footer-spacer main-content d-flex  gap-lg-3 flex-column flex-lg-row">
				<Col lg={4} className="col">
					<Link to={'/'} className="brand-logo">
						<img src={logo} alt="blocktickets" />
					</Link>
					<p className="tag-line">The future of ticketing is here</p>
				</Col>
				<Col xs={10} lg="auto" xl={5} className="col">
					<Stack direction="horizontal" className="main-links">
						<ul>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Terms & Conditions</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Purchase Policy</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Privacy Policy</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Cookies Policy</Nav.Link>
								</LinkContainer>
							</li>
						</ul>
						<ul>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Disclaimer</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/login">
									<Nav.Link to="">Client Login</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">About Us</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link to="">Help</Nav.Link>
								</LinkContainer>
							</li>
						</ul>
					</Stack>
				</Col>
				<Col className="col">
					<h3 className="footer-title">Also find us on</h3>
					<Stack as="ul" direction="horizontal" className="justify-content-between">
						<li>
							<a href="">
								<img src={facebook} alt="facebook" />
							</a>
						</li>
						<li>
							<a href="">
								<img src={instagram} alt="instagram" />
							</a>
						</li>
						<li>
							<a href="">
								<img src={twitter} alt="twitter" />
							</a>
						</li>
						<li>
							<a href="">
								<img src={tiktok} alt="tiktok" />
							</a>
						</li>
						<li>
							<a href="">
								<img src={discord} alt="discord" />
							</a>
						</li>
					</Stack>
				</Col>
			</Row>

			<div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center py-4 copyright caption">
				<p className="text-muted">Copyright &copy; {getCopyrightYear()} Blocktickets. All rights reserved</p>
			</div>
		</footer>
	);
}
