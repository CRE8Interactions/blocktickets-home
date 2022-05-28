import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '..';
import { TicketCard } from '../../TicketCard';

export default function MyListingsSlider({
	ticketStatus,
	ticketState,
	listings,
	removeListing,
	getListings
}) {
	if (listings && listings.types && ticketState) listings = listings.types[ticketState];

	return (
		<div className="page-slider">
			<Slider addedModule="pagination">
				{listings &&
					listings.length >= 1 &&
					listings.map((listing, index) => {
						return (
							<SwiperSlide key={index}>
								<TicketCard
									ticketStatus={ticketStatus}
									ticketState={ticketState}
									listing={listing}
									key={index}
									removeListing={removeListing}
									getListings={getListings}
								/>
							</SwiperSlide>
						);
					})}
			</Slider>
		</div>
	);
}
