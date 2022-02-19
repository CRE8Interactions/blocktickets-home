import React, { Fragment, useContext, useEffect } from 'react';
import { MyCard } from './../Card';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slider.scss';

export default function Slider() {
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={2}
			navigation
			pagination={{ clickable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}>
			<SwiperSlide>
				<MyCard />
			</SwiperSlide>
		</Swiper>
	);
}
