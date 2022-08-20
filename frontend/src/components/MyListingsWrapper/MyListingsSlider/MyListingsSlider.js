import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';
import { TicketModal } from '../../TicketModal';

export default function MyListingsSlider({ navigationNextRef, navigationPrevRef, ticketStatus, ticketState, listings, removeListing, getListings }) {
    if (listings && listings.types && ticketState) listings = listings.types[ticketState];

    return (
        <div className="page-slider">
            <Slider addedModule="pagination" navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
                {listings &&
                    listings.length >= 1 &&
                    listings.map((listing, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
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
