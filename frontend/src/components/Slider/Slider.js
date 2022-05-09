import React from 'react';

// import { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider({ children }) {
	return (
		<Swiper
			preventClicks={false}
			preventClicksPropagation={false}
			noSwipingSelector={'button'}
			spaceBetween={27}
			slidesPerView={'auto'}
			pagination={{ clickable: true }}
			navigation={true}
			modules={[
				Pagination
			]}>
			{children}
		</Swiper>
	);
}
