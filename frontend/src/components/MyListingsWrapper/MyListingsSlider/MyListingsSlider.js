import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { sortBy } from '../../../utilities/helpers';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';

export default function MyListingsSlider({ navigationNextRef, navigationPrevRef, ticketStatus, ticketState, listings, handleClick }) {
    if (listings && listings.types && ticketState) listings = listings.types[ticketState];

    return (
        <div className="page-slider">
            <Slider addedModule="pagination" navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
                {listings &&
                    listings.length >= 1 &&
                    sortBy(listings, 'event').map((listing, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <TicketCard
                                    ticketStatus={ticketStatus}
                                    ticketState={ticketState}
                                    listing={listing}
                                    key={index}
                                    handleClick={handleClick}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Slider>
        </div>
    );
}
