import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BackButton } from '../BackButton';

import './settingsWrapper.scss';

export default function SettingsWrapper({ children }) {
	return (
		<Row id="settings-container">
			<Col md={3}>
				<BackButton marginBottom="4" />
			</Col>
			<Col md={7} lg={5} className="d-flex-column">
				{children}
			</Col>
		</Row>
	);
}
