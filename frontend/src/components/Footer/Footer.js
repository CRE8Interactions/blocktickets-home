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
		<footer className="footer-spacer">
			<Container>
				<Row className="main-content d-flex flex-column gap-md-3 flex-md-row">
					<Col>
						<h1 className="brand-logo">
							<img src={logo} alt="blocktickets" />
						</h1>
						<p className="tag-line">The future of ticketing is here</p>
					</Col>
					<Col md={2} className="col">
						<h3 className="footer-nav-list-title caption--uppercase">Blocktickets</h3>
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
					<Col md={2} className="col">
						<h3 className="footer-nav-list-title caption--uppercase">Info</h3>
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
						<h3 className="footer-title ">Join Newsletter</h3>
						<p className="small">
							Subscribe to our newsletter to get notified over the latest releases
						</p>
						<InputField type="email" placeholder="Enter your email" color="primary" />
					</Col>
				</Row>
			</Container>

			<div className="container d-flex flex-column flex-md-row justify-content-md-between align-items-center pt-4 copyright caption">
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
