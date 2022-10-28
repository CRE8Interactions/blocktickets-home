import React from 'react'

import Carousel from "react-bootstrap/Carousel"

import arenasStadiums from '../../../assets/arenas_stadiums.png';
import amphitheaters from '../../../assets/amphitheaters.png';
import theaters from '../../../assets/theaters.png';
import clubs from '../../../assets/clubs.png';
import festivals from '../../../assets/festivals.png';


export default function MyCarousel({ activeSlide }) {

    const indicatorLabels = [0, 1, 2, 3, 4]

    return (
        <Carousel indicatorLabels={indicatorLabels} pause={false}
        >
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={arenasStadiums}
                    alt="Arenas & Stadiums"
                />
                <Carousel.Caption>
                    <h3>Arenas & Stadiums</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={amphitheaters}
                    alt="Amphitheaters"
                />
                <Carousel.Caption>
                    <h3>Amphitheaters</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={theaters}
                    alt="Theaters"
                />
                <Carousel.Caption>
                    <h3>Theaters</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={clubs}
                    alt="clubs"
                />
                <Carousel.Caption>
                    <h3>Clubs</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={festivals}
                    alt="festivals"
                />
                <Carousel.Caption>
                    <h3>Festivals</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
