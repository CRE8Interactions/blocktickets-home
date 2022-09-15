import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import UserContext from '../../context/User/User';
import AuthService from '../../utilities/services/auth.service';

import { getVenues, createEvent, getEvent, editEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';
import { CreateEventButtons } from '../CreateEventButtons';

export default function BasicInfoWrapper({ eventId }) {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const organization = AuthService.getOrg()[0];

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

    const [initialState, setInitialState] = useState();

    const [showFooter, setShowFooter] = useState(false)

    const [eventStart, setEventStart] = useState(new Date(moment('7:00 pm', 'h:mm a').format()));

    const [eventEnd, setEventEnd] = useState(new Date(moment('10:00 pm', 'h:mm a').format()));

    const [doorsOpen, setDoorsOpen] = useState(new Date(moment('6:00 pm', 'h:mm a').format()));

    const [hasError, setHasError] = useState(false)

    const [timeError, setTimeError] = useState(false)

    const [venues, setVenues] = useState()

    const [event, setEvent] = useState({
        presentedBy: '',
        name: '',
        venue: '',
        timezone: timezoneOpt[0].value,
        displayStartTime: true,
        displayDoorsOpen: false,
        displayEventEnd: false
    })

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {

        // save initial state to check whether to show save buttons
        setInitialState({
            event,
            eventStart,
            eventEnd,
            doorsOpen
        })

        getVenues()
            .then((res) => { setVenues(res?.data) })
            .catch((err) => console.error(err))

        if (!eventId) return;

        getEvent(eventId)
            .then((res) => {
                setEvent(res?.data)
                setEventStart(moment(res?.data?.start).toDate())
                setEventEnd(moment(res?.data?.end).toDate())
            })
            .catch((err) => console.error(err))
    }, [])

    // make doors open the same as event start when event start changes 
    useEffect(() => {
        // create a moment object
        const dateObj = moment(doorsOpen)

        // do changes on that object
        dateObj.set('year', moment(eventStart).year());
        dateObj.set('month', moment(eventStart).month());
        dateObj.set('date', moment(eventStart).date());
        setDoorsOpen(new Date(dateObj))

    }, [eventStart])

    // validation for doors open
    useEffect(() => {
        if (event.displayDoorsOpen) {
            setTimeError(doorsOpen.getTime() > eventStart.getTime())
        }
    }, [doorsOpen, event.displayDoorsOpen])

    useEffect(() => {
        // Future event
    }, [event])

    useEffect(() => {
        if (initialState?.event !== event) setShowFooter(true)
        else setShowFooter(false)

    }, [initialState, event.presentedBy, event.name, event.venue, event.timezone, event.displayStartTime, event.displayEndTime, event.displayDoorsOpen])

    const handleChange = (e, val = e.target.value) => {
        setEvent({ ...event, [e.target.name]: val })
    }

    const handleSave = () => {
        // TODO: add validation - An event can't be created by an organization if there's already one present with the same name and start date and location
        setIsSaving(true)
        // create event 
        const data = {};
        data['name'] = event.name;
        // data['summary'] = description;
        data['presentedBy'] = event.presentedBy;
        data['start'] = moment(eventStart).format();
        data['end'] = moment(eventEnd).format();
        data['venue'] = (Number(event.venue));
        data['status'] = 'unpublished';
        data['currency'] = 'usd';
        data['online_event'] = false;
        data['organizationId'] = organization?.id;
        data['hide_end_date'] = !event?.displayEndTime;
        if (eventId) {
            data['uuid'] = eventId;
            data['venue'] = (Number(event.venue));
            editEvent({ data })
                .then((res) => {
                    navigate(`/myevent/${eventId}/basic-info`)
                    setIsSaving(false)
                    setAlert({
                        show: true,
                        variant: 'success',
                        message: 'Your info has been updated.'
                    })
                })
                .catch((err) => {
                    console.error(err)
                    window.scrollTo(0, 0)
                    // navigate(`/myevent/${eventId}/basic-info`)
                    setIsSaving(false)
                    setAlert({
                        show: true,
                        variant: 'danger',
                        message: 'Unable to save info please try again.'
                    })
                })

        } else {
            createEvent({ data })
                .then((res) => {
                    setIsSaving(false)
                    navigate(`/myevent/${res.data?.data?.attributes?.uuid}/details`)
                })
                .catch((err) => {
                    window.scrollTo(0, 0)
                    console.error(err)
                    setIsSaving(false)
                    // navigate(`/myevent/${eventId}/basic-info`)
                    setAlert({
                        show: true,
                        variant: 'danger',
                        message: 'Unable to save info please try again.'
                    })
                })
        }
    }

    return (
        <>
            <section className='wrapper event-form'>
                {alert.show &&
                    <>
                        <Alert variant={alert.variant} className="mb-5" onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                            {alert.message}
                        </Alert>
                    </>
                }
                <section>
                    <header className="section-header-sm section-heading section-heading--secondary">
                        <h1>Basic info</h1>
                    </header>
                    <Card body className='card--sm'>
                        <BasicInfo handleChange={handleChange} event={event} />
                    </Card>
                </section>
                <section>
                    <header className="section-header-sm section-heading section-heading--secondary">
                        <h1>Date & Time</h1>
                    </header>
                    <Card body className='card--sm'>
                        <DateTime event={event} handleChange={handleChange} setEventStart={setEventStart} eventStart={eventStart} setEventEnd={setEventEnd} eventEnd={eventEnd} setDoorsOpen={setDoorsOpen} doorsOpen={doorsOpen} setError={setHasError} error={hasError} timeError={timeError} />
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
            </section>

            {showFooter && (
                <CreateEventButtons isEditing={eventId ? true : false} isDisabled={hasError || timeError || !event.name || !event.venue} isSaving={isSaving} handleSave={handleSave} styles={`${!eventId ? 'without-sidebar' : ' '} `} />
            )
            }
        </>
    );
}
