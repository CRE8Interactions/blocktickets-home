import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SwiperNavigationButtons } from '../SwiperNavigationButtons';
import { IconButton } from '../IconButton';

import profile from '../../assets/01.png';

import './hero.scss';

export default function Hero(props) {
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);
	const { events } = props;
	console.log(events)
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
								{events && 
									events.map((event, index) => {
										return (
											<SwiperSlide key={index}>
												<Row className="justify-content-lg-between" key={index}>
													<Col lg={7} xl={8}>
														<img
															src={event?.image?.formats?.small?.url}
															width="640"
															height="556"
															alt="image"
															className="artist-image banner-image"
														/>
													</Col>
													<Col lg={4} className=" d-flex flex-column">
														<h1 className="display-1">{ event?.name }</h1>
														<Row>
															<Col md={6} lg={12}>
																<div className="time-wrapper">
																	<p className="time-caption">Time</p>
																	<p className="fw-semi-bold normal-lg">
																		{moment(event?.start).format('MMM')} {moment(event?.start).format('DD')} <span>{moment(event?.start).format('h:mm A')}</span>
																	</p>
																</div>
															</Col>
															<Col md={6} lg={12}>
																<div className="venue-wrapper">
																	<p className="venue-caption">Venue</p>
																	<p className="fw-semi-bold normal-lg">
																		{ event?.venue?.name }
																	</p>
																</div>
															</Col>
															<Col>
																<div className="location-wrapper">
																	<p className="location-caption">Location</p>
																	<p>{ event?.venue?.address[0]?.city}, { event?.venue?.address[0]?.state}</p>
																</div>
															</Col>
														</Row>
														<IconButton
															styles="btn-hero"
															variant="primary"
															size="lg"
															link={"/tickets/"+event?.id+"?type=genAdmission"}
															btn="tickets--plain">
															Get Tickets
														</IconButton>
													</Col>
												</Row>
											</SwiperSlide>
										)
									})
								}
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
