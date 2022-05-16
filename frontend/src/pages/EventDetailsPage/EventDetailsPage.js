import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrder } from '../../utilities/api';

import { EventDetailsWrapper } from '../../components';

export default function EventDetailsPage() {
	let { orderId } = useParams();

	useEffect(
		() => {
			getOrder(orderId).then((res) => setOrder(res.data)).catch((err) => console.error(err));
		},
		[
			orderId
		]
	);

	const [
		order,
		setOrder
	] = useState();

	return <EventDetailsWrapper order={order} />;
}
