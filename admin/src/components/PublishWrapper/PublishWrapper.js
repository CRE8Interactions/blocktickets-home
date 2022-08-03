import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { PublishEvent } from './PublishEvent';
import { BackButton } from '../BackButton';

export default function PublishWrapper({ eventId, handleNext, handleGoBack }) {

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    const [eventStarted, setEventStarted] = useState(false)

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

    const handleSave = () => {
        navigate('..')
    }

    const checkEventStart = () => {
        const currentDate = new Date();
        setEventStarted(date.getTime() < currentDate.getTime())
    }

    useEffect(() => {
        checkEventStart()
    }, [])

    // update state every second
    setTimeout(() => {
        checkEventStart()
    }, 1000);

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>Publish event</h1>
            </header>
            <Card body className="card--sm">
                <PublishEvent setDate={setDate} date={date} handleChoice={handleChoice} choice={choice} eventStarted={eventId && eventStarted} />
            </Card>
            <Stack direction="horizontal" className="btn-group-flex ">
                {!eventId && (<BackButton handleGoBack={handleGoBack} />)}
                <Button className={`${!eventId ? `btn-${choice == '1' ? 'send' : 'schedule'}` : ''} `} size="lg" onClick={handleClick}>{eventId ? 'Save changes' : `${choice == '1' ? 'Publish' : 'Schedule'}`}</Button>
            </Stack>
        </section>
    );
}
