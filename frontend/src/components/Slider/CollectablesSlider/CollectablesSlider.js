import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function CollectablesSlider() {
	// will come from database
	const ticketType = 'collectable';

	return (
		<Slider>
			<SwiperSlide>
				<TicketCard ticketType={ticketType} />
			</SwiperSlide>
			<SwiperSlide>
				<TicketCard ticketType={ticketType} />
			</SwiperSlide>
		</Slider>
	);
}
