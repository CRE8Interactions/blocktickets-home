import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyListingsSlider({ ticketStatus, ticketState, order, tickets }) {
	return (
		<div className="page-slider">
			<Slider>
				{/* {order &&
					tickets &&
					tickets.map((ticket, index) => {
						return ( */}
				<SwiperSlide>
					<TicketCard ticketStatus={ticketStatus} ticketState={ticketState} />
				</SwiperSlide>
				<SwiperSlide>
					<TicketCard ticketStatus={ticketStatus} ticketState={ticketState} />
				</SwiperSlide>
				{/* );
					})} */}
			</Slider>
		</div>
	);
}
