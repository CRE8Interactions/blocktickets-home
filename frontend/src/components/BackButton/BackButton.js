import React from 'react';

import Button from 'react-bootstrap/Button';

import './backButton.scss';

export default function BackButton({ handleGoBack }) {
	return (
		<Button
			onClick={handleGoBack}
			className="d-flex icon-button mt-0 mb-3 align-self-start btn-back"
			variant="outline-light"
			size="sm">
			Back
		</Button>
	);
}
