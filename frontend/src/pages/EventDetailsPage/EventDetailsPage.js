import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { EventDetailsWrapper } from '../../components';

export default function EventDetailsPage() {
	let { id } = useParams();
	const [
		order,
		setOrder
	] = useState('');
	// useEffect(() => {
	// 	getOrder(id).then((res) => setOrder(res.data)).catch((err) => console.error(err));
	// }, []);
	return <EventDetailsWrapper id={id} />;
}
