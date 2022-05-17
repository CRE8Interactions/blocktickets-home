import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyCollectablesSlider() {
	// will come from database
	const ticketType = 'collectable';

	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				<SwiperSlide>
					<TicketCard ticketType={ticketType} />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard ticketType={ticketType} />
				</SwiperSlide>
			</Slider>
		</div>
	);
}
