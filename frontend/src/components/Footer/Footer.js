import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import logo from '../../assets/logo.svg';
import { copyright } from './../../utilities/helper';
import './footer.scss';
import InputField from './../InputField/InputField';

export default function Footer() {
	return (
		<footer className="spacer-sm">
			<Container>
				<Row className="main-content d-flex flex-column gap-5 gap-md-3 flex-md-row">
					<Col>
						<h1 className="brand-logo">
							<img src={logo} alt="blocktickets" />
						</h1>
						<p>The future of ticketing is here</p>
					</Col>
					<Col xs={2}>
						<h3 className="footer-navlist-title caption--uppercase">Blocktickets</h3>
						<ul>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
						</ul>
					</Col>
					<Col xs={2}>
						<h3 className="footer-navlist-title caption--uppercase">Info</h3>
						<ul>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
							<li>
								<Nav.Link href="">cta 1</Nav.Link>
							</li>
						</ul>
					</Col>
					<Col>
						<h3 className="footer-navlist-title caption--uppercase">Join Newsletter</h3>
						<p>Subscribe to our newsletter to get notified over the latest releases</p>
						<InputField type="email" placeholder="Enter your email" color="primary" />
					</Col>
				</Row>
			</Container>

			<div className="container d-flex flex-column flex-md-row justify-content-md-between align-items-center my-4 caption">
				<p className="text-muted">
					Copyright &copy; {copyright()} Blocktickets. All rights reserved
				</p>
				<p>
					We use cookies for better service. <Button variant="link">Accept</Button>
				</p>
			</div>
		</footer>
	);
}
