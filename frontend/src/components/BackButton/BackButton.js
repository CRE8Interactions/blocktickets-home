import React from 'react';

import { IconButton } from './../IconButton';

import './backButton.scss';

export default function BackButton() {
	return (
		<IconButton
			styles="mt-0 mb-3 align-self-start"
			variant="outline-light"
			btn="back"
			size="sm"
			link="../">
			Back
		</IconButton>
	);
}
