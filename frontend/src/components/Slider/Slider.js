import React from 'react';

// import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';

export default function Slider({ children }) {
	// let breakpointsObj;

	// if (breakpoints) {
	// 	breakpointsObj = {
	// 		// when window width is >= 600
	// 		600: {
	// 			slidesPerView: 2,
	// 			slidesPerGroup: 2
	// 		},

	// 		// when window width is >= 920
	// 		920: {
	// 			slidesPerView: 3,
	// 			slidesPerGroup: 3
	// 		},
	// 		// when window width is >= 1200
	// 		1200: {
	// 			slidesPerView: 4,
	// 			slidesPerGroup: 4
	// 		}
	// 	};
	// }
	// else {
	// 	breakpointsObj = {};
	// }
	return (
		<Swiper
			preventClicks={false}
			preventClicksPropagation={false}
			noSwipingSelector={'button'}
			spaceBetween={27}
			slidesPerView={'auto'}
			pagination={true}
			navigation={true}
			modules={[
				Pagination
			]}>
			{children}
		</Swiper>
	);
}
