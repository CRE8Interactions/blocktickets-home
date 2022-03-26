import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './backButton.scss';

export default function BackButton({ handleGoBack, marginBottom = 0 }) {
	const navigate = useNavigate();

	const onClick = () => {
		return handleGoBack ? handleGoBack() : navigate(-1);
	};
	return (
		<Button
			onClick={onClick}
			className={`d-flex icon-button mt-0 mb-${marginBottom} align-self-start btn btn-back`}
			variant="outline-light"
			size="sm">
			Back
		</Button>
	);
}
