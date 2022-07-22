import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

import { PublishEvent } from './PublishEvent';

export default function PublishWrapper() {

    const [date, setDate] = useState(new Date());

    const [choice, setChoice] = useState('1')

    const handleChoice = (e) => {
        setChoice(e.target.id)
    }

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>Publish event</h1>
            </header>
            <Card body className="card--sm">
                <PublishEvent setDate={setDate} date={date} handleChoice={handleChoice} choice={choice} />
            </Card>
        </section>
    );
}
