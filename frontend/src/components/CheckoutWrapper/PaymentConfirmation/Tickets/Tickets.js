import React, { Fragment } from 'react';
import { Ticket } from './Ticket';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './tickets.scss';

export default function Tickets({order}) {

	return (
		<Fragment>
			<h1 className="section-title section-title--muted">Tickets</h1>

			<Stack gap={4} as="ul" className="mt-md-3 ">
				{ order && order.tickets.map((ticket, index) => {
					return (
						<li className="ticket" key={index}>
							<Ticket ticket={ticket} order={order}/>
						</li>
					)
				})}
			</Stack>
			<Button variant="primary" id="myWalletBtn">
				Go to My Wallet
			</Button>
		</Fragment>
	);
}
