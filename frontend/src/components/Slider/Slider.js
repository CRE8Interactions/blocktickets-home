import React from 'react';

import { Swiper } from 'swiper/react';
// import required modules
import { Pagination, Navigation, Lazy } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';

export default function Slider({ navigationPrevRef, navigationNextRef, slidesPerView = 'auto', addedModule, children }) {

    let moduleArr = [
        Navigation,
        Lazy
    ];

    if (addedModule === 'pagination') {
        moduleArr = [
            ...moduleArr,
            Pagination
        ];
    }

    return (
        <Swiper
            preventClicks={false}
            preventClicksPropagation={false}
            noSwipingSelector={'button'}
            spaceBetween={27}
            slidesPerView={slidesPerView}
            preloadImages={false}
            watchSlidesProgress={true}
            lazy={{
                loadPrevNext: true
            }}
            pagination={{
                clickable: true
            }}
            navigation={{
                nextEl: navigationNextRef?.current,
                prevEl: navigationPrevRef?.current
            }}
            modules={moduleArr}
            onInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef?.current;
                swiper.params.navigation.nextEl = navigationNextRef?.current;
                swiper.navigation.init();
                swiper.navigation.update()
            }}>
            {children}
        </Swiper>
    );
}
