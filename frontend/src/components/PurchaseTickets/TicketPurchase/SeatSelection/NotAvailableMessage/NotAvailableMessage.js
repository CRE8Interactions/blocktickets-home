import React from 'react';

import Stack from 'react-bootstrap/Stack';

import './notAvailableMessage.scss';

export default function NotAvailableMessage({ children }) {
	return (
		<Stack direction="vertical" id="notAvailable">
			{children}
		</Stack>
	);
}
