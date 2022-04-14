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
import { DefaultCard } from './DefaultCard';

import './addOnCard.scss';

const typeOfCard = (type) => {
	switch (type) {
		case 'parking':
			return <ParkingCard />;

		case 'merch':
			return <MerchCard />;

		default:
			return <DefaultCard />;
	}
};
export default function AddOnCard({ data }) {
	return <Fragment>{typeOfCard(data.type)}</Fragment>;
}
