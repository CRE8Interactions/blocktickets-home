import React, { Fragment, useContext, useEffect, useRef } from 'react';

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
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);
	return (
		<div className="hero">
			<header className="spacer-lg">
				<Row>
					<Col>
						<Swiper
							spaceBetween={20}
							slidesPerView={1}
							navigation={{
								nextEl: navigationNextRef.current,
								prevRef: navigationPrevRef.current
							}}
							pagination={{ clickable: true }}>
							<SwiperSlide>
								<Row className="justify-content-lg-between">
									<Col lg={7} xl={8}>
										<img
											src={profile}
											alt="image"
											className="artist-image banner-image"
										/>
									</Col>
									<Col lg={4} className=" d-flex flex-column">
										<h1 className="display-1">Nic Fanciulli</h1>
										<Row>
											<Col md={6} lg={12}>
												<div className="time">
													<p className="time-caption">Time</p>
													<p className="date normal-lg">
														Mar 13 <span>9:00 PM</span>
													</p>
												</div>
											</Col>
											<Col md={6} lg={12}>
												<div className="venue">
													<p className="venue-caption">Venue</p>
													<p className="venue normal-lg">
														CODA or venue long name here as another
														example
													</p>
												</div>
											</Col>
											<Col>
												<div className="location">
													<p className="location-caption">Location</p>
													<p className="location">Toronto, ON</p>
												</div>
											</Col>
										</Row>
										<IconButton
											styles="btn-hero"
											variant="secondary"
											size="lg"
											link="/tickets/1"
											btn="tickets--plain">
											Get Tickets
										</IconButton>
									</Col>
								</Row>
							</SwiperSlide>
						</Swiper>
					</Col>
					<Col md={6} lg={12} xl={4} className="ms-auto navigation-buttons">
						<SwiperNavigationButtons styles="justify-content-center justify-content-xl-start" />
					</Col>
				</Row>
			</header>
		</div>
	);
}
