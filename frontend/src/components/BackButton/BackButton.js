import React, { Fragment, useContext, useEffect } from 'react';

import { IconButton } from './../IconButton';

import './backButton.scss';

export default function BackButton() {
	return (
		<IconButton styles="mt-0 mb-3" variant="outline-light" btn="back" size="sm" link="../">
			Back
		</IconButton>
	);
}
