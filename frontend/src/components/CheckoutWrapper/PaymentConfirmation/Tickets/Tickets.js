import React, { Fragment } from 'react';
import { Ticket } from './Ticket';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './tickets.scss';

export default function Tickets() {
	return (
		<Fragment>
			<h1 className="section-title section-title--muted">Tickets</h1>

			<Stack gap={4} as="ul" className="mt-md-3">
				<li className="ticket">
					<Ticket />
				</li>
				<li className="ticket">
					<Ticket />
				</li>
				<li className="ticket">
					<Ticket />
				</li>
				<li className="ticket">
					<Ticket />
				</li>
			</Stack>
			<Button variant="primary" id="myWalletBtn">
				Go to My Wallet
			</Button>
		</Fragment>
	);
}
