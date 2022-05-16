import React from 'react';
import { useParams } from 'react-router-dom';

import { EventDetailsWrapper } from '../../components';

export default function EventDetailsPage() {
	let { orderId } = useParams();

	return <EventDetailsWrapper orderId={orderId} />;
}
