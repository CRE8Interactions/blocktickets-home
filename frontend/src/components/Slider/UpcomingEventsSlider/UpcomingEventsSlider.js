import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

// Import Swiper styles
import 'swiper/css';

export default function UpcomingEventsSlider() {
	return (
		<div className="swiper-page">
			<Slider slidesPerView={'auto'} breakpoints={false}>
				<SwiperSlide className="w-auto">
					<TicketCard />
				</SwiperSlide>
				<SwiperSlide className="w-auto">
					<TicketCard />
				</SwiperSlide>
			</Slider>
		</div>
	);
}
