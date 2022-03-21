import React, { Fragment, useContext, useEffect } from 'react';
import { MyCard } from './../Card';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './slider.scss';

export default function Slider({ prefix }) {
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={2}
			pagination={{ clickable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}
			navigation={true}
			// Responsive breakpoints
			breakpoints={{
				920: {
					slidesPerView: 3,
					slidesPerGroup: 3
				},
				// when window width is >= 1200
				1200: {
					slidesPerView: 4,
					slidesPerGroup: 4
				},
				// when window width is >= 1440
				1440: {
					slidesPerView: 5,
					slidesPerGroup: 5
				}
			}}>
			<SwiperSlide>
				<MyCard prefix={prefix} type="genAdmissions" />
			</SwiperSlide>
			<SwiperSlide>
				<MyCard prefix={prefix} type="
				" />
			</SwiperSlide>
			<SwiperSlide>
				<MyCard prefix={prefix} type="
				" />
			</SwiperSlide>
			<SwiperSlide>
				<MyCard prefix={prefix} type="
				" />
			</SwiperSlide>
			<SwiperSlide>
				<MyCard prefix={prefix} type="" />
			</SwiperSlide>
		</Swiper>
	);
}
