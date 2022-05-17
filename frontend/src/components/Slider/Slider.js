import React, { useState, useEffect } from 'react';

// import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Slider({ addedModule = 'navigation', children }) {
	let moduleArr;

	if (addedModule === 'pagination') {
		moduleArr = [
			Pagination,
			Navigation
		];
	}
	else {
		moduleArr = [
			Navigation
		];
	}

	return (
		<Swiper
			preventClicks={false}
			preventClicksPropagation={false}
			noSwipingSelector={'button'}
			spaceBetween={27}
			slidesPerView={'auto'}
			pagination={{
				clickable: true
			}}
			navigation={true}
			modules={moduleArr}>
			{children}
		</Swiper>
	);
}
