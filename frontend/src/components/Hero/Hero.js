import React, { useState } from 'react';

import { useWindowSize } from '../../utilities/hooks';

import { SearchBar } from '../SearchBar';

import './hero.scss';

export default function Hero({ events }) {
    const windowSize = useWindowSize();

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClick = () => {
        if (windowSize < 768) {
            handleShow()
        }
    }

    return (
        <header className="hero">
            <div className="d-flex-column align-items-center">
                <h1 className='display-1'>The future of ticketing is here</h1>
                <h2 className='subtitle'>Get your NFT tickets for live events and discover unforgettable moments from your favourite artists</h2>
            </div>
            <div className="hero-search" onClick={handleClick}>
                <SearchBar size="lg" showMobile={false} open={show} showBtn={true} placeholder="Search for events near you" />
            </div>
        </header>
    );
}
