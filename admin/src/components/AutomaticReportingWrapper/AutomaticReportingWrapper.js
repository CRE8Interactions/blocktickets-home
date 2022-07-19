import React from 'react';

import { AutomaticReports } from './AutomaticReports'


export default function AutomaticReportingWrapper() {

    return (
        <section className='max-width-wrapper'>
            <header className='section-header'>
                <div className="section-header" >
                    <div className="section-heading">
                        <h1>Automatic reporting</h1>
                    </div>
                    <p className='section-header-desc'>Let your team know how many tickets have been sold for your event</p>
                </div>
            </header>
            <AutomaticReports />
        </section>

    );
}
