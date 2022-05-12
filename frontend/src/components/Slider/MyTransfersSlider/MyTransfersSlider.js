import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyTransfersSlider({ order, tickets }) {
	return (
		<div className="page-slider">
			<Slider>
				{/* {order &&
					tickets &&
					tickets.map((ticket, index) => {
						return ( */}
				<SwiperSlide>
					<TicketCard ticketStatus="transferred" />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard ticketStatus="transferred" />
				</SwiperSlide>
				{/* );
					})} */}
			</Slider>
		</div>
	);
}
