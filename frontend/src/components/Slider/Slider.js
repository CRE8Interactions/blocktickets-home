import React from 'react';
// import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './slider.scss';

export default function Slider({ children, slidesPerView = 1, breakpoints = true }) {
	let breakpointsObj;

	if (breakpoints) {
		breakpointsObj = {
			// when window width is >= 600
			600: {
				slidesPerView: 2,
				slidesPerGroup: 2
			},

			// when window width is >= 920
			920: {
				slidesPerView: 3,
				slidesPerGroup: 3
			},
			// when window width is >= 1200
			1200: {
				slidesPerView: 4,
				slidesPerGroup: 4
			}
		};
	}
	else {
		breakpointsObj = {};
	}
	return (
		<Swiper
			spaceBetween={30}
			slidesPerView={slidesPerView}
			pagination={{ clickable: true }}
			navigation={true}
			// Responsive breakpoints
			breakpoints={breakpointsObj}>
			{children}
		</Swiper>
	);
}
