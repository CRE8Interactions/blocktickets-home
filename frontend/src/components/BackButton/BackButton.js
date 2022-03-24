import React from 'react';

import Button from 'react-bootstrap/Button';

import './backButton.scss';

export default function BackButton({ handleGoBack, marginBottom = 3 }) {
	return (
		<Button
			onClick={handleGoBack}
			className={`d-flex icon-button mt-0 mb-${marginBottom} align-self-start btn btn-back`}
			variant="outline-light"
			size="sm">
			Back
		</Button>
	);
}
