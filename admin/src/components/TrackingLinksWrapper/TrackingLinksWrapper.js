import React from 'react';

import { TrackingLinks } from './TrackingLinks'


export default function TrackingLinksWrapper() {

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
            <TrackingLinks />
        </section>

    );
}
