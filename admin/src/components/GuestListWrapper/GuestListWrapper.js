import React from 'react';

import { GuestList } from './GuestList'

export default function GuestListWrapper() {

    return (
        <section className='max-width-wrapper'>
            <header className='section-header'>
                <div className="section-header" >
                    <div className="section-heading">
                        <h1>Guest list</h1>
                    </div>
                    <p className='section-header-desc'>Manually add your guests information for complimentary tickets</p>
                </div>
            </header>
            <GuestList />
        </section>

    );
}
