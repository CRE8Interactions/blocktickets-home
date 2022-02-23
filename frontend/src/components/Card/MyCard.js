import React, { Fragment, useContext, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { IconButton } from '../IconButton';

import './card.scss';

export default function MyCard() {
	return (
		<Card>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>Dua Lipa: The future Nostalgic Tour</Card.Title>
				<Card.Subtitle>Coda venue with a long long name</Card.Subtitle>
				<hr />
				<Row>
					<span className="col caption">Mar 13 9:30PM</span>
					<span className="col caption text-end">Toronto, CA</span>
				</Row>
				<IconButton variant="outline-light" styles="btn--tickets text-secondary">
					Get Tickets
				</IconButton>
			</Card.Body>
		</Card>
	);
}
