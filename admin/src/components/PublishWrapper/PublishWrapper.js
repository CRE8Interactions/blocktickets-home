import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { publishEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { PublishEvent } from './PublishEvent';

export default function PublishWrapper({ eventId, event }) {

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    const [eventStarted, setEventStarted] = useState(false)

    const [publishType, setPublishType] = useState()

    const [publishDate, setPublishDate] = useState()

    const [choice, setChoice] = useState('1')

    const handleChoice = (e) => {
        setChoice(e.target.id)
        setPublishType(e.target.id)
    }

    const checkEventStart = () => {
        const currentDate = new Date();
        setEventStarted(moment(event?.start) < currentDate.getTime())
    }

    const publish = () => {
        let data = {};
        data['publishType'] = publishType ? publishType : 1;
        data['publishDate'] = moment(publishDate).format();
        data['event'] = event;

        publishEvent({ data })
            .then((res) => {
                navigate('/events')
            })
            .catch((err) => console.error(err))

    }

    useEffect(() => {
        setPublishDate(date)
    }, [date])

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
                <PublishEvent setDate={setDate} date={date} handleChoice={handleChoice} choice={choice} eventStarted={eventStarted} event={event} />
            </Card>
            <Stack direction="horizontal" className="btn-group-flex ">

                <Button className={`${!eventId ? `btn-${choice == '1' ? 'send' : 'schedule'}` : ''} `} size="lg" onClick={publish}>{eventId ? 'Save changes' : `${choice == '1' ? 'Publish' : 'Schedule'}`}</Button>
            </Stack>
        </section>
    );
}
