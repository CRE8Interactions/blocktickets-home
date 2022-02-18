import React, { Fragment, useContext, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './card.scss';

export default function MyCard() {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>Event name goes here</Card.Title>
				<Card.Subtitle>Artist Name</Card.Subtitle>
				<hr />
				<Card.Text />
				<Button variant="outline-secondary">Get Tickets</Button>
			</Card.Body>
		</Card>
	);
}
