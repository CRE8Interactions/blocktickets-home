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
					<li className="ticket">
						<Ticket order={order} />
					</li>
				}
			</Stack>
			<Link to="/my-events" className="btn btn-primary" id="myEventsBtn">
				Go to My Events
			</Link>
		</Fragment>
	);
}
