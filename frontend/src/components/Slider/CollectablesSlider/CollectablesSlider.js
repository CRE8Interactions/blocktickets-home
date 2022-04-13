import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

// Import Swiper styles
import 'swiper/css';

export default function CollectablesSlider() {
	// will come from database
	const ticketType = 'collectable';

	return (
		<div className="swiper-page">
			<Slider slidesPerView={'auto'} breakpoints={false}>
				<SwiperSlide className="w-auto">
					<TicketCard ticketType={ticketType} />
				</SwiperSlide>
				<SwiperSlide className="w-auto">
					<TicketCard ticketType={ticketType} />
				</SwiperSlide>
			</Slider>
		</div>
	);
}
