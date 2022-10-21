import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { sortBy } from '../../../utilities/helpers';

import { Slider } from '../../Slider';
import { TicketCard } from '../../TicketCard';
import TransferCard from '../../TransferCard/TransferCard';
import moment from 'moment';

export default function MyEventsSlider({ navigationNextRef, navigationPrevRef, orders, transfers, acceptTransfer, isAccepting, guestLists }) {
    // filter out past events
    const filteredEvents = orders ? orders.filter((order) => moment(order.event?.start).isSameOrAfter(moment(), 'day')) : '';

    return (
        <div className="page-slider">
            <Slider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} addedModule="pagination">
                {transfers &&
                    sortBy(transfers, 'event').map((transfer, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <TransferCard
                                    transfer={transfer}
                                    status={'userAccepting'}
                                    isAccepting={isAccepting}
                                    acceptTransfer={acceptTransfer}
                                />
                            </SwiperSlide>
                        );
                    })}

                {orders &&
                    sortBy(filteredEvents, 'event').map((o, index) => {
                        if (o.tickets.length === 0 && o.event !== null) return;
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <TicketCard event={o.event} tickets={o.tickets} order={o} />
                            </SwiperSlide>
                        );
                    })}

                {guestLists &&
                    guestLists.map((gl, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <TicketCard guestList={gl} />
                            </SwiperSlide>
                        );
                    })
                }
            </Slider>
        </div>
    );
}
