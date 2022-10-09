import React from 'react';

import './venueBanner.scss';

export default function VenueBanner({ venue }) {
    console.log(venue)
    return (
        <header className="jumbotron" style={{ backgroundImage: `url(${venue?.banner?.url})` }}>
        </header>
    );
}
