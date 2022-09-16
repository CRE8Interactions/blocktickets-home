import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { publishEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { PublishEvent } from './PublishEvent';
import { Spinner } from '../Spinner';

export default function PublishWrapper({ event }) {

    const navigate = useNavigate();

    const [publishDate, setPublishDate] = useState(new Date(moment('12:00 pm', 'h:mm a').format()));

    const [eventStarted, setEventStarted] = useState(false)

    const [publishType, setPublishType] = useState('1');

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    const [isSaving, setIsSaving] = useState(false)

    const checkEventStart = () => {
        const currentDate = new Date();
        setEventStarted(moment(event?.start) < currentDate.getTime())
    }

    const publish = () => {
        setIsSaving(true)
        let data = {};
        data['publishType'] = publishType ? publishType : 1;
        data['publishDate'] = moment(publishDate).format();
        // Remove tickets so payload isn't too large
        delete event?.tickets;
        data['event'] = event;

        publishEvent({ data })
            .then((res) => {
                setIsSaving(false)
                if (data.publishType == 2) {
                    setAlert({
                        show: true,
                        variant: 'success',
                        message: 'Your event has been scheduled.'
                    })
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
                setIsSaving(false)
                {
                    console.error(err)
                }
                setAlert({
                    show: true,
                    variant: 'danger',
                    message: 'Unable to save info please try again.'
                })
            })

    }

    useEffect(() => {
        checkEventStart()
        if (event?.scheduled) setPublishDate(new Date(event?.scheduledTime))
    }, [event])

    // update state every second
    setTimeout(() => {
        checkEventStart()
    }, 1000);

    return (
        <>
            <section className='wrapper'>
                {alert.show &&
                    <>
                        <Alert variant={alert.variant} className="mb-5" onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                            {alert.message}
                        </Alert>
                    </>
                }
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Publish event</h1>
                </header>
                <Card body className="card--sm">
                    <PublishEvent setDate={setPublishDate} date={publishDate} setPublishType={setPublishType} publishType={publishType} eventStatus={event?.status} eventStarted={eventStarted} event={event} />
                </Card>
            </section>
            {(!eventStarted && event?.status !== "on_sale") && (
                <div className="btn-footer">
                    <Stack direction="horizontal" className="btn-group-flex wrapper">
                        {isSaving ? (
                            <Spinner variant="light" size="sm" />
                        ) : (
                            <Button className={`btn-${publishType == '1' ? 'send' : 'schedule'} `} size="lg" onClick={publish} disabled={event?.tickets?.length === 0}>{publishType == '1' ? 'Publish' : 'Schedule'}</Button>
                        )}
                    </Stack>
                </div>
            )}
        </>
    );
}
