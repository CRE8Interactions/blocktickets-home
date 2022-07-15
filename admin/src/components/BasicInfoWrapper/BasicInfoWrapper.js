import React from 'react';

import Card from 'react-bootstrap/Card';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';

export default function BasicInfoWrapper() {

    const handleChange = (e) => { }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Basic info</h1>
                </header>
                <Card body className='card--sm'>
                    <BasicInfo handleChange={handleChange} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Date & Time</h1>
                </header>
                <Card body className='card--sm'>
                    <DateTime handleChange={handleChange} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Location</h1>
                </header>
                <Card body className='card--sm'>
                    <Location handleChange={handleChange} />
                </Card>
            </section>
        </section>
    );
}
