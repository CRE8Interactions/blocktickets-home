import React, { useEffect, useState } from 'react';

import { TrackingLinks } from './TrackingLinks';
import { getPromoStats } from '../../utilities/api';
import { useParams } from 'react-router-dom';

export default function TrackingLinksWrapper() {
    const [promos, setPromos] = useState([])

    const { uuid } = useParams()

    useEffect(() => {
        getPromoStats(uuid)
            .then((res) => setPromos(res.data))
            .catch((err) => console.error(err))

    }, [uuid])

    return (
        <section className='max-width-wrapper'>
            <header className='section-header'>
                <div className="section-header" >
                    <div className="section-heading">
                        <h1>Tracking links</h1>
                    </div>
                    <p className='section-header-desc'>Use custom links to track the success of your promotional emails, promoter partners, and more</p>
                </div>
            </header>
            <TrackingLinks promos={promos} />
        </section>

    );
}


