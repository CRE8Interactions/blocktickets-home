import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { ParkingCard } from './ParkingCard';
import { MerchCard } from './MerchCard';

import info from '../../../../../assets/icons/info.svg';

import './addOnCard.scss';

const typeOfCard = (type) => {
	switch (type) {
		case 'parking':
			return <ParkingCard />;

		case 'merch':
			return <MerchCard />;

		default:
			return;
	}
};
export default function AddOnCard({ data }) {
	return (
		<Card body className="card--light">
			<Stack direction="horizontal" className="heading--flex heading--flex--card">
				<Stack direction="horizontal" className="card-title-flex">
					<Card.Title as="h5" className="normal">
						{data.addOn}
					</Card.Title>
					<Form.Switch id="custom-switch" aria-label="Meet and Greet" />
				</Stack>
				<Stack direction="horizontal" className="price">
					<span>$45.00</span>
					<Button variant="default" size="sm" className="btn--info">
						<img src={info} alt="" />
					</Button>
				</Stack>
			</Stack>
			{typeOfCard(data.type)}
		</Card>
	);
}
