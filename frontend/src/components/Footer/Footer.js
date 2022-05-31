import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

import { getCopyrightYear } from '../../utilities/helpers';

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
			<Row className="footer-spacer main-content d-flex  gap-lg-4 flex-column flex-lg-row">
				<Col lg={4} className="col">
					<Link to={'/'} className="brand-logo">
						<img src={logo} alt="blocktickets" />
					</Link>
					<p className="tag-line">The future of ticketing is here</p>
				</Col>
				<Col xs={11} md={8} lg="auto" xl={5} className="col">
					<Stack direction="horizontal" className="main-links">
						<ul>
							<li>
								<LinkContainer to="/">
									<Nav.Link>Terms & Conditions</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link>Purchase Policy</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/privacy-policy">
									<Nav.Link>Privacy Policy</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link>Cookies Policy</Nav.Link>
								</LinkContainer>
							</li>
						</ul>
						<ul>
							<li>
								<LinkContainer to="/">
									<Nav.Link>Disclaimer</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/login">
									<Nav.Link>Client Login</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link>About Us</Nav.Link>
								</LinkContainer>
							</li>
							<li>
								<LinkContainer to="/">
									<Nav.Link>Help</Nav.Link>
								</LinkContainer>
							</li>
						</ul>
					</Stack>
				</Col>
				<Col className="col">
					<h3 className="footer-title">Also find us on</h3>
					<Stack as="ul" direction="horizontal" className="social-icons">
						<li>
							<a href="https://www.facebook.com/blocktickets" target="_blank">
								<img src={facebook} alt="facebook" />
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com/blocktickets" target="_blank">
								<img src={instagram} alt="instagram" />
							</a>
						</li>
						<li>
							<a href="https://www.twitter.com/blocktickets" target="_blank">
								<img src={twitter} alt="twitter" />
							</a>
						</li>
						<li>
							<a href="https://www.tiktok.com/blocktickets" target="_blank">
								<img src={tiktok} alt="tiktok" />
							</a>
						</li>
						<li>
							<a href="https://www.discord.com/blocktickets" target="_blank">
								<img src={discord} alt="discord" />
							</a>
						</li>
					</Stack>
				</Col>
			</Row>

			<div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center copyright caption">
				<p className="text-muted">Copyright &copy; {getCopyrightYear()} Blocktickets. All rights reserved</p>
			</div>
		</footer>
	);
}
