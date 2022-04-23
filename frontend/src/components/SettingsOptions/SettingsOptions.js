import React from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M14.5909 7.26521C14.9968 6.8906 15.6294 6.9159 16.004 7.32172L19.2348 10.8217C19.5884 11.2047 19.5884 11.7952 19.2348 12.1782L16.004 15.6783C15.6294 16.0841 14.9968 16.1094 14.591 15.7348C14.1851 15.3602 14.1598 14.7276 14.5344 14.3217L16.216 12.5L6.5 12.5C5.94771 12.5 5.5 12.0523 5.5 11.5C5.5 10.9477 5.94771 10.5 6.5 10.5L16.216 10.5L14.5344 8.67829C14.1598 8.27247 14.1851 7.63981 14.5909 7.26521Z"
									fill="#777E91"
								/>
							</svg>
						</div>
					</Card>
				</Link>
			</Col>
			<Col xs={12} md={5}>
				<Link to="">
					<Card body className="card-lg card--light setting-card">
						<div className="card-heading">
							<Card.Title as="h5">Login & Security</Card.Title>
							<Card.Text>
								Change your phone number and make sure your account is secure
							</Card.Text>
						</div>
						<div className="mt-auto">
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M14.5909 7.26521C14.9968 6.8906 15.6294 6.9159 16.004 7.32172L19.2348 10.8217C19.5884 11.2047 19.5884 11.7952 19.2348 12.1782L16.004 15.6783C15.6294 16.0841 14.9968 16.1094 14.591 15.7348C14.1851 15.3602 14.1598 14.7276 14.5344 14.3217L16.216 12.5L6.5 12.5C5.94771 12.5 5.5 12.0523 5.5 11.5C5.5 10.9477 5.94771 10.5 6.5 10.5L16.216 10.5L14.5344 8.67829C14.1598 8.27247 14.1851 7.63981 14.5909 7.26521Z"
									fill="#777E91"
								/>
							</svg>
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
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M14.5909 7.26521C14.9968 6.8906 15.6294 6.9159 16.004 7.32172L19.2348 10.8217C19.5884 11.2047 19.5884 11.7952 19.2348 12.1782L16.004 15.6783C15.6294 16.0841 14.9968 16.1094 14.591 15.7348C14.1851 15.3602 14.1598 14.7276 14.5344 14.3217L16.216 12.5L6.5 12.5C5.94771 12.5 5.5 12.0523 5.5 11.5C5.5 10.9477 5.94771 10.5 6.5 10.5L16.216 10.5L14.5344 8.67829C14.1598 8.27247 14.1851 7.63981 14.5909 7.26521Z"
									fill="#777E91"
								/>
							</svg>
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
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M14.5909 7.26521C14.9968 6.8906 15.6294 6.9159 16.004 7.32172L19.2348 10.8217C19.5884 11.2047 19.5884 11.7952 19.2348 12.1782L16.004 15.6783C15.6294 16.0841 14.9968 16.1094 14.591 15.7348C14.1851 15.3602 14.1598 14.7276 14.5344 14.3217L16.216 12.5L6.5 12.5C5.94771 12.5 5.5 12.0523 5.5 11.5C5.5 10.9477 5.94771 10.5 6.5 10.5L16.216 10.5L14.5344 8.67829C14.1598 8.27247 14.1851 7.63981 14.5909 7.26521Z"
									fill="#777E91"
								/>
							</svg>
						</div>
					</Card>
				</Link>
			</Col>
		</Row>
	);
}
