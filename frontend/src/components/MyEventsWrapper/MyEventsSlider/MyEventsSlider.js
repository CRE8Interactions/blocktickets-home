import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';
import TransferCard from '../../TransferCard/TransferCard';

export default function MyEventsSlider({ navigationNextRef, navigationPrevRef, orders, transfers, acceptTransfer }) {

    // filter out past events
    const filteredEvents = orders ? orders.filter((order) => order.event !== null) : '';

    return (
        <div className="page-slider">
            <Slider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} addedModule="pagination">
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
                    filteredEvents.map((o, index) => {
                        if (o.tickets.length === 0 && o.event !== null) return;
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
