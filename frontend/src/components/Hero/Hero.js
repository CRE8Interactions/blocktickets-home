import React, { Fragment, useContext, useEffect } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import profile from '../../assets/01.png';
import './hero.scss';

export default function Hero() {
	return (
		<header>
			<Swiper
				spaceBetween={20}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}>
				<SwiperSlide>
					<Container className="hero">
						<Row className="justify-content-between">
							<Col md={7}>
								<img src={profile} alt="image" />
							</Col>
							<Col md={4} className="d-flex flex-column">
								<h1 className="display-1">Nic Fanciulli</h1>
								<div>
									<p className="small">Time</p>
									<p className="bold">
										Fri Mar 11, 2020 <span>9:00 PM</span>
									</p>
								</div>
								<div>
									<p className="small">Venue</p>
									<p className="text-uppercase bold">CODA</p>
								</div>
								<div>
									<p className="small">Location</p>
									<p>794 Bathurst Street Toronto, ON M5R 3G1</p>
								</div>
								<Button variant="primary">Get Tickets</Button>
							</Col>
						</Row>
					</Container>
				</SwiperSlide>
				<SwiperNavigationButtons />
			</Swiper>
		</header>
	);
}
