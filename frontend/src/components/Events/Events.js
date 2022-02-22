import React, { Fragment, useContext, useEffect } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import profile from '../../assets/01.png';
import './events.scss';
import { Slider } from '../Slider';

export default function Events() {
	return (
		<section>
			<div className="section-heading d-flex justify-content-between align-items-center">
				<h1>Trending Events</h1>
				<SwiperNavigationButtons />
			</div>
			<div>
				<Slider prefix="events" />
			</div>
		</section>
	);
}
