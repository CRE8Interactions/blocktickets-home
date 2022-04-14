import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import logo from '../../assets/logo.svg';
import { getCopyrightYear } from './../../utilities/helper';
import InputField from './../InputField/InputField';
import './footer.scss';

export default function Footer() {
	return (
		<footer className="footer-spacer" id="footer">
			<Row className="main-content d-flex flex-column gap-lg-3 flex-md-row">
				<Col>
					<Link to={'/'} className="brand-logo">
						<img src={logo} alt="blocktickets" />
					</Link>
					<p className="tag-line">The future of ticketing is here</p>
				</Col>
				<Col md={2} className="col">
					<h3 className="footer-nav-list-title caption--uppercase">Blocktickets</h3>
					<ul>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
					</ul>
				</Col>
				<Col md={2} className="col">
					<h3 className="footer-nav-list-title caption--uppercase">Info</h3>
					<ul>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
						<li>
							<LinkContainer to="/">
								<Nav.Link to="">cta 1</Nav.Link>
							</LinkContainer>
						</li>
					</ul>
				</Col>
				<Col>
					<h3 className="footer-title">Join Newsletter</h3>
					<p className="small">
						Subscribe to our newsletter to get notified over the latest releases
					</p>
					<InputField
						type="email"
						placeholder="Enter your email"
						color="primary"
						size="lg"
						styles="mt-4"
					/>
				</Col>
			</Row>

			<div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center pt-4 copyright caption">
				<p className="text-muted">
					Copyright &copy; {getCopyrightYear()} Blocktickets. All rights reserved
				</p>
				<p>
					We use cookies for better service. <Button variant="link">Accept</Button>
				</p>
			</div>
		</footer>
	);
}
