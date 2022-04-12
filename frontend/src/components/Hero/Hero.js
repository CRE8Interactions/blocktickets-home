import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
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
											width="640"
											height="556"
											alt="image"
											className="artist-image banner-image"
										/>
									</Col>
									<Col lg={4} className=" d-flex flex-column">
										<h1 className="display-1">Nic Fanciulli</h1>
										<Row>
											<Col md={6} lg={12}>
												<div className="time-wrapper">
													<p className="time-caption">Time</p>
													<p className="fw-semi-bold normal-lg">
														Mar 13 <span>9:00 PM</span>
													</p>
												</div>
											</Col>
											<Col md={6} lg={12}>
												<div className="venue-wrapper">
													<p className="venue-caption">Venue</p>
													<p className="fw-semi-bold normal-lg">
														CODA or venue long name here as another
														example
													</p>
												</div>
											</Col>
											<Col>
												<div className="location-wrapper">
													<p className="location-caption">Location</p>
													<p>Toronto, ON</p>
												</div>
											</Col>
										</Row>
										<IconButton
											styles="btn-hero"
											variant="primary"
											size="lg"
											link="/tickets/1?type=genAdmission"
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
