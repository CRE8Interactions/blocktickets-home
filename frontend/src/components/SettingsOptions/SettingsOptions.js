import React from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { SettingsOptionsIcon } from './SettingsOptionsIcon';

import './settingsOptions.scss';

export default function SettingsOptionsPage() {
	return (
		<Row id="settings-options-container">
			<Col xs={12} md={5}>
				<Link to="personal-details">
					<Card body className="card-lg card--light setting-card">
						<div className="card-heading">
							<Card.Title as="h5">Personal Details</Card.Title>
							<Card.Text>Provide your personal information</Card.Text>
						</div>
						<div className="mt-auto">
							<SettingsOptionsIcon />
						</div>
					</Card>
				</Link>
			</Col>
			<Col xs={12} md={5}>
				<Link to="login-security">
					<Card body className="card-lg card--light setting-card">
						<div className="card-heading">
							<Card.Title as="h5">Login & Security</Card.Title>
							<Card.Text>
								Change your phone number and make sure your account is secure
							</Card.Text>
						</div>
						<div className="mt-auto">
							<SettingsOptionsIcon />
						</div>
					</Card>
				</Link>
			</Col>

			<Col xs={12} md={5}>
				<Link to="">
					<Card body className="card-lg card--light setting-card">
						<div className="card-heading">
							<Card.Title as="h5">Withdraw & Invoices</Card.Title>
							<Card.Text>View / Download your previous invoices and with</Card.Text>
						</div>
						<div className="mt-auto">
							<SettingsOptionsIcon />
						</div>
					</Card>
				</Link>
			</Col>
			<Col xs={12} md={5}>
				<Link to="">
					<Card body className="card-lg card--light setting-card">
						<div className="card-heading">
							<Card.Title as="h5">Payment information</Card.Title>
							<Card.Text>
								Add your payment information to withdrawn funds after you sell a
								ticket
							</Card.Text>
						</div>
						<div className="mt-auto">
							<SettingsOptionsIcon />
						</div>
					</Card>
				</Link>
			</Col>
		</Row>
	);
}
