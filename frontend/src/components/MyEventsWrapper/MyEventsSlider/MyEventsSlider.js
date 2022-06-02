import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';
import TransferCard from '../../TransferCard/TransferCard';

export default function MyEventsSlider({ orders, transfers, acceptTransfer }) {
	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				{transfers &&
					transfers.map((transfer, index) => {
						return (
							<SwiperSlide key={index} className="swiper-lazy">
								<TransferCard
									transfer={transfer}
									status={'userAccepting'}
									acceptTransfer={acceptTransfer}
								/>
							</SwiperSlide>
						);
					})}

				{orders &&
					orders.map((o, index) => {
						if (o.tickets.length === 0) return;
						return (
							<SwiperSlide key={index} className="swiper-lazy">
								<TicketCard event={o.event} tickets={o.tickets} order={o} />
							</SwiperSlide>
						);
					})}
			</Slider>
		</div>
	);
}
