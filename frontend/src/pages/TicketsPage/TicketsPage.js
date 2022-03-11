import React, { Fragment, useEffect } from 'react';

import { Ticket, PurchaseTickets } from '../../components';

export default function TicketsPage() {
	return (
		<Fragment>
			<Ticket />
			<PurchaseTickets />
		</Fragment>
	);
}
