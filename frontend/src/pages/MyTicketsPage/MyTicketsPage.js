import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';

import { MyTicketsSlider, BackButton } from '../../components';

export default function MyTicketsPage() {
	let { id } = useParams();
	const [
		order,
		setOrder
	] = useState('');
	// useEffect(() => {
	// 	getOrder(id).then((res) => setOrder(res.data)).catch((err) => console.error(err));
	// }, []);
	return (
		<section className="spacer-xs">
			<div className="section-heading-sm">
				<h1>My Tickets</h1>
				<BackButton />
			</div>
			<MyTicketsSlider id={id} />
			<Stack
				direction="horizontal"
				gap={3}
				className="btn-group-flex justify-content-center align-items-center">
				<Link to="" className="btn btn-dark">
					Transfer
				</Link>
				<Link to="" className="btn btn-dark">
					Sell
				</Link>
			</Stack>
		</section>
	);
}
