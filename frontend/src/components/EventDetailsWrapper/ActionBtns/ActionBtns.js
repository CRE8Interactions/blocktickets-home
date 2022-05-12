import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function ActionBtns({ handleClick, ticketStatus }) {
	return (
		<Stack
			direction="horizontal"
			gap={3}
			className="btn-group-flex justify-content-center action-btns justify-content-md-end mt-md-2">
			<Button
				onClick={() => handleClick('transfer')}
				variant="dark"
				size="lg"
				disabled={ticketStatus === 'transferred'}>
				Transfer
			</Button>
			<Button
				disabled={ticketStatus === 'listed'}
				onClick={() => handleClick('sell')}
				variant="dark"
				size="lg">
				Sell
			</Button>
		</Stack>
	);
}
