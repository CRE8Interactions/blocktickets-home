import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BackButton } from '../BackButton';

import './settingsWrapper.scss';

export default function SettingsWrapper({ children }) {
	return (
		<Row id="settings-container">
			<Col md={4}>
				<BackButton marginBottom="4" />
			</Col>
			<Col md={5}>{children}</Col>
		</Row>
	);
}
