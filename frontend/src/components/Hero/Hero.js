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
			<Row>
				<Col>
					<Swiper
						spaceBetween={20}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						onSwiper={(swiper) => console.log(swiper)}
						onSlideChange={() => console.log('slide change')}>
						<SwiperSlide>
							<Row className="justify-content-lg-between">
								<Col md={7} xl={8}>
									<img src={profile} alt="image" className="banner-image" />
								</Col>
								<Col md={4} className="d-flex flex-column">
									<h1 className="display-1">Nic Fanciulli</h1>
									<div className="time">
										<p className="caption ">Time</p>
										<p className="bold date body-lg">
											Mar 13 <span>9:00 PM</span>
										</p>
									</div>
									<div className="venue">
										<p className="caption">Venue</p>
										<p className="bold body-lg">
											CODA or venue long name here as another example
										</p>
									</div>
									<div className="location">
										<p className="caption ">Location</p>
										<p>Toronto, ON</p>
									</div>
									<IconButton
										variant="secondary"
										styles="btn--tickets btn--medium">
										Get Tickets
									</IconButton>
								</Col>
							</Row>
						</SwiperSlide>
					</Swiper>
				</Col>
				<Col xl={4} className="ms-auto navigation-buttons">
					<SwiperNavigationButtons styles="justify-content-center justify-content-xl-start" />
				</Col>
			</Row>
		</header>
	);
}
