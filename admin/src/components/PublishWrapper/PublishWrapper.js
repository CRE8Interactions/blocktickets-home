import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { PublishEvent } from './PublishEvent';
import { BackButton } from '../BackButton';

export default function PublishWrapper({ eventId, handleNext, handleGoBack }) {

    const [date, setDate] = useState(new Date());

    const [choice, setChoice] = useState('1')

    const handleChoice = (e) => {
        setChoice(e.target.id)
    }

    const handleClick = (e) => {
        if (handleNext) {
            handleNext(e, { publish_date: date })
        } else {
            // save changes
            handleSave()
        }
    }

    const handleSave = () => { }

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>Publish event</h1>
            </header>
            <Card body className="card--sm">
                <PublishEvent setDate={setDate} date={date} handleChoice={handleChoice} choice={choice} />
            </Card>
            <Stack direction="horizontal" className="btn-group-flex ">
                {!eventId && (<BackButton handleGoBack={handleGoBack} />)}
                <Button className={`${!eventId ? 'btn-next' : ''} `} size="lg" onClick={handleClick}>{eventId ? 'Save changes' : 'Publish'}</Button>
            </Stack>
        </section>
    );
}
