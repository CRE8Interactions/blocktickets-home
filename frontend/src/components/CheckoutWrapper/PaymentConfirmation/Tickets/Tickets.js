import React, { Fragment } from 'react';
import { Ticket } from './Ticket';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Tickets() {
	return (
		<Fragment>
			<Stack direction="horizontal" className="heading--flex mb-3">
				<h1 className="section-title m-0">Tickets</h1>
				<Button variant="primary" className="ml-auto">
					Go to My Wallet
				</Button>
			</Stack>

			<Stack gap={4} as="ul">
				<li className="ticket">
					<Ticket />
				</li>
			</Stack>
		</Fragment>
	);
}
