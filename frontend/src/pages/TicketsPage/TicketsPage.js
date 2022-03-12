import React, { Fragment, useEffect } from 'react';

import { PurchaseTickets } from '../../components';
import Ticket from '../../components/Ticket/Ticket';

export default function TicketsPage() {
	return (
		<Fragment>
			<Ticket />
			<PurchaseTickets />
		</Fragment>
	);
}
