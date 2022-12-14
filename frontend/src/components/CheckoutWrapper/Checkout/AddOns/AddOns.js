import React, { Fragment } from 'react';

import Stack from 'react-bootstrap/Stack';

import { AddOnCard } from './AddOnCard';

export default function AddOns() {
	const types = [
		'meet',
		'parking',
		'merch'
	];

	// for demo purposes, will come from database
	let cards = [
		{
			addOn: 'Meet & Greet',
			type: 'meet'
		},
		{
			addOn: 'Parking Pass',
			type: 'parking'
		},
		{
			addOn: 'Merch',
			type: 'merch'
		}
	];

	return (
		<Fragment>
			<h1 className="section-title">Add Ons</h1>

			<Stack gap={4} as="ul">
				{cards.map((data) => (
					<li>
						<AddOnCard data={data} />
					</li>
				))}
			</Stack>
		</Fragment>
	);
}
