import React from 'react';

import Card from 'react-bootstrap/Card';

import { PublishEvent } from './PublishEvent';

export default function PublishWrapper({ handleChange }) {

    return (
        <>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Publish event</h1>
                </div>
                <Card body className="card--light">
                    <PublishEvent />
                </Card>
            </section>
        </>
    );
}
