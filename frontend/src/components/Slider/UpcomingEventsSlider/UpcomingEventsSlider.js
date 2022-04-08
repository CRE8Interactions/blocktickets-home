import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

// Import Swiper styles
import 'swiper/css';

import './upcomingEventsSlider.scss';

export default function UpcomingEventsSlider() {
	return (
		<div id="upcoming">
			<Slider slidesPerView={'auto'} breakpoints={false}>
				<SwiperSlide>
					<TicketCard />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard />
				</SwiperSlide>
			</Slider>
		</div>
	);
}
