import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';

import { Ticket } from './Ticket';

import './tickets.scss';

export default function Tickets({ order }) {
	return (
		<Fragment>
			<h1 className="section-title section-title--muted">Tickets</h1>

			<Stack gap={4} as="ul" className="mt-md-3 ">
				{order &&
					order.tickets.map((ticket, index) => {
						return (
							<li className="ticket" key={index}>
								<Ticket ticket={ticket} order={order} />
							</li>
						);
					})}
			</Stack>
			<Link to="/upcoming-events" className="btn btn-primary" id="myWalletBtn">
				Go to My Events
			</Link>
		</Fragment>
	);
}
