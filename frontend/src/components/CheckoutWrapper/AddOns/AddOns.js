import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AddOnCard } from './AddOnCard';
import info from '../../../assets/icons/info.svg';
import './addOns.scss';

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
			<h1 className="fs-md mb-4">Add Ons</h1>

			<ul>
				<Stack gap={4}>
					{cards.map((data) => (
						<li>
							<AddOnCard data={data} />
						</li>
					))}
				</Stack>
			</ul>
		</Fragment>
	);
}
