import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

// Import Swiper styles
import 'swiper/css';

export default function UpcomingEventsSlider({order}) {
	return (
		<div className="swiper-page">
			<Slider slidesPerView={'auto'} breakpoints={false}>
				{ order && order.map((o, index) => {
					return(
						<SwiperSlide className="w-auto" key={index}>
							<TicketCard order={o} />
						</SwiperSlide>
					)
				})}
			</Slider>
		</div>
	);
}
