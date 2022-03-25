import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { ParkingCard } from './ParkingCard';
import { MerchCard } from './MerchCard';

import info from '../../../../assets/icons/info.svg';

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
		<Card body>
			<div className="heading--flex heading--flex--card">
				<Stack direction="horizontal" className="card-title-flex">
					<Card.Title as="h5" className="normal">
						{data.addOn}
					</Card.Title>
					<Form.Switch id="custom-switch" aria-label="Meet and Greet" />
				</Stack>
				<div className="price">
					<span>$45.00</span>
					<Button variant="default" size="sm" className="btn--info">
						<img src={info} alt="" />
					</Button>
				</div>
			</div>
			{typeOfCard(data.type)}
		</Card>
	);
}
