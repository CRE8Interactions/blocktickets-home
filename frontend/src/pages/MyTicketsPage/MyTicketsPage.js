import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MyTicketsWrapper } from '../../components';

export default function MyTicketsPage() {
	let { id } = useParams();
	const [
		order,
		setOrder
	] = useState('');
	// useEffect(() => {
	// 	getOrder(id).then((res) => setOrder(res.data)).catch((err) => console.error(err));
	// }, []);
	return <MyTicketsWrapper id={id} />;
}
