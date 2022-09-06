import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { publishEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { PublishEvent } from './PublishEvent';

export default function PublishWrapper({ event }) {

    const navigate = useNavigate();

    const [publishDate, setPublishDate] = useState(new Date());

    const [eventStarted, setEventStarted] = useState(false)

    const [publishType, setPublishType] = useState('1')

    const checkEventStart = () => {
        const currentDate = new Date();
        setEventStarted(moment(event?.start) < currentDate.getTime())
    }

    const publish = () => {
        let data = {};
        data['publishType'] = publishType ? publishType : 1;
        data['publishDate'] = moment(publishDate).format();
        // Remove tickets so payload isn't to large
        delete event?.tickets;
        data['event'] = event;

        publishEvent({ data })
            .then((res) => {
                navigate('/')
            })
            .catch((err) => console.error(err))

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
                <PublishEvent setDate={setPublishDate} date={publishDate} setPublishType={setPublishType} publishType={publishType} eventStatus={event?.status} eventStarted={eventStarted} event={event} />
            </Card>
            {!eventStarted && event?.status !== "on_sale" && (
                <Stack direction="horizontal" className="btn-group-flex ">
                    <Button className={`btn-${publishType == '1' ? 'send' : 'schedule'} `} size="lg" onClick={publish}>{publishType == '1' ? 'Publish' : 'Schedule'}</Button>
                </Stack>
            )}
        </section>
    );
}
