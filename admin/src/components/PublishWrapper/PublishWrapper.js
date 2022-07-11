import React from 'react';

import Card from 'react-bootstrap/Card';

import { PublishEvent } from './PublishEvent';

export default function PublishWrapper({ handleChange }) {

    return (
        <>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Publish event</h1>
                </header>
                <Card body className="card--sm">
                    <PublishEvent />
                </Card>
            </section>
        </>
    );
}
