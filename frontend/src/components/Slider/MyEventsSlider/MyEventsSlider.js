import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';
import TransferCard from '../../TransferCard/TransferCard';

export default function MyEventsSlider({ order, transfers, acceptTransfer }) {
	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				{transfers &&
					transfers.map((transfer, index) => {
						return (
							<SwiperSlide key={index}>
								<TransferCard
									transfer={transfer}
									status={'userAccepting'}
									acceptTransfer={acceptTransfer}
								/>
							</SwiperSlide>
						);
					})}

				{order &&
					order.upcoming.map((o, index) => {
						return (
							<SwiperSlide key={index}>
								<TicketCard event={o.event} tickets={o.tickets} order={o} />
							</SwiperSlide>
						);
					})}
			</Slider>
		</div>
	);
}
