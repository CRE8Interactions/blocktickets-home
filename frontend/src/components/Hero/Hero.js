import React, { Fragment, useContext, useEffect } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IconButton } from '../IconButton';

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
					<div className="hero">
						<Row className="justify-content-between">
							<Col md={7}>
								<img src={profile} alt="image" />
							</Col>
							<Col md={4} className="d-flex flex-column">
								<h1 className="display-1">Nic Fanciulli</h1>
								<div>
									<p className="caption time">Time</p>
									<p className="bold date body-lg">
										Mar 13 <span>9:00 PM</span>
									</p>
								</div>
								<div>
									<p className="caption venue">Venue</p>
									<p className="bold body-lg">
										CODA or venue long name here as another example
									</p>
								</div>
								<div>
									<p className="caption location">Location</p>
									<p>Toronto, ON</p>
								</div>
								<IconButton variant="secondary" styles="btn--tickets btn--medium">
									Get Tickets
								</IconButton>
							</Col>
						</Row>
					</div>
				</SwiperSlide>
				<SwiperNavigationButtons />
			</Swiper>
		</header>
	);
}
