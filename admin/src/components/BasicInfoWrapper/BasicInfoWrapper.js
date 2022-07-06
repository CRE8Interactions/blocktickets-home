import React from 'react';

import Card from 'react-bootstrap/Card';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';

export default function BasicInfoWrapper({ handleChange }) {

    return (
        <>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Basic info</h1>
                </div>
                <Card body className="card--light">
                    <BasicInfo handleChange={handleChange} />
                </Card>
            </section>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Date & Time</h1>
                </div>
                <Card body className="card--light">
                    <DateTime handleChange={handleChange} />
                </Card>
            </section>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Location</h1>
                </div>
                <Card body className="card--light">
                    <Location handleChange={handleChange} />
                </Card>
            </section>
        </>
    );
}
