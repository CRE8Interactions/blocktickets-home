import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { Slider } from '../../Slider';
import { TransferCard } from '../../TransferCard';

export default function MyTransfersSlider({ navigationNextRef, navigationPrevRef, transfers, cancel }) {
    return (
        <div className="page-slider">
            <Slider addedModule="pagination" navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
                {transfers &&
                    transfers.map((transfer, index) => {
                        return (
                            <SwiperSlide key={index} className="swiper-lazy">
                                <TransferCard transfer={transfer} cancel={cancel} />
                            </SwiperSlide>
                        );
                    })}
            </Slider>
        </div>
    );
}
