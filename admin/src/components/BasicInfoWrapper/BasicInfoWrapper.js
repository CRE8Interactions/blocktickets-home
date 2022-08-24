import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../../context/User/User';
import { getCategories, getVenues, createEvent, getEvent, editEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';

import moment from 'moment';

export default function BasicInfoWrapper({ eventId }) {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const organization = user?.orgs[0];
    const { uuid } = useParams()

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

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())
    }, [startDate, endDate])

    const [categories, setCategories] = useState()

    const [venues, setVenues] = useState()

    const [event, setEvent] = useState({
        presentedBy: '',
        name: '',
        venue: '',
        timezone: timezoneOpt[0].value,
        displayEndTime: true
    })

    useEffect(() => {
        getCategories()
            .then((res) => { setCategories(res?.data?.data) })
            .catch((err) => console.error(err))

        getVenues()
            .then((res) => { setVenues(res?.data) })
            .catch((err) => console.error(err))
        
        if (!uuid) return;

        getEvent(uuid)
            .then((res) => {
                setEvent(res?.data)
                setStartDate(moment(res?.data?.start).toDate())
                setEndDate(moment(res?.data?.end).toDate())
            })
            .catch((err) => console.error(err))
    }, [])

    const handleChange = (e, val = e.target.value) => {
        setEvent({ ...event, [e.target.name]: val })
    }

    const handleSave = () => {
        // create event 
        const data = {};
        data['name'] = event.name;
        // data['summary'] = description;
        data['presentedBy'] = event.presentedBy;
        data['start'] = moment(startDate).format();
        data['end'] = moment(endDate).format();
        data['venue'] = (Number(event.venue));
        data['status'] = 'unpublished';
        data['currency'] = 'usd';
        data['online_event'] = false;
        data['organizationId'] = organization?.id;
        if (uuid) {
            data['uuid'] = uuid;
            data['venue'] = (Number(event.venue?.id));
            editEvent({ data })
                .then((res) => console.log(res.data))
                .catch((err) => console.error(err))
            
        } else {
        createEvent({ data })
            .then((res) => navigate(`/myevent/${res.data?.data?.attributes?.uuid}/details`))
            .catch((err) => console.error(err))
        }
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Basic info</h1>
                </header>
                <Card body className='card--sm'>
                    <BasicInfo handleChange={handleChange} event={event} categories={categories} />
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
                    <Location event={event} handleChange={handleChange} timezoneOpt={timezoneOpt} venues={venues} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button size="lg" disabled={!event.name || !event.venue} onClick={handleSave}>Save {eventId ? 'changes' : 'and continue'}</Button>
            </Stack>
        </section>
    );
}
