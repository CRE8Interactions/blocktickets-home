import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';

export default function BasicInfoWrapper({ eventId, handleNext }) {

    const navigate = useNavigate();

    const eventTypeOpt = [
        {
            label: 'Concert',
            value: "concert"
        },
        {
            label: 'Music',
            value: "music"
        },
        {
            label: 'Event',
            value: "event"
        }
    ]

    const timezoneOpt = [
        {
            label: '(GMt-0400) United States (New York) Time',
            value: "NY"
        },
        {
            label: '(GMt-0400) British Virgin Island Time',
            value: "BVI"
        },
        {
            label: '(GMt-0400) United States (Chicago) Time',
            value: "CH"
        }
    ]

    const langOpt = [
        {
            label: 'English (US)',
            value: "EN+US"
        },
        {
            label: 'English (UK)',
            value: "EN+UK"
        },
        {
            label: 'French (France)',
            value: "FR"
        }
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])

    const [event, setEvent] = useState({
        presentedBy: '',
        title: '',
        eventType: eventTypeOpt[0].value,
        timezone: timezoneOpt[0].value,
        language: langOpt[0].value,
        displayEndTime: true
    })

    const handleChange = (e, val = e.target.value) => {
        setEvent({ ...event, [e.target.name]: val })
    }

    const handleClick = (e) => {
        if (handleNext) {
            handleNext(e, { ...event, start_date: startDate, end_date: endDate })
        } else {
            // save changes
            handleSave()
        }
    }

    const handleSave = () => {
        navigate('..')
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Basic info</h1>
                </header>
                <Card body className='card--sm'>
                    <BasicInfo handleChange={handleChange} handleClick={handleClick} event={event} eventTypeOpt={eventTypeOpt} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Date & Time</h1>
                </header>
                <Card body className='card--sm'>
                    <DateTime event={event} handleChange={handleChange} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Location</h1>
                </header>
                <Card body className='card--sm'>
                    <Location event={event} handleChange={handleChange} timezoneOpt={timezoneOpt} langOpt={langOpt} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button className={`${!eventId ? 'btn-next' : ''} `} size="lg" onClick={handleClick}>Save {eventId ? 'changes' : 'and continue'}</Button>
            </Stack>
        </section>
    );
}
