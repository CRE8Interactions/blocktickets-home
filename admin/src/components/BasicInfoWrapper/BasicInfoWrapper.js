import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import AuthService from '../../utilities/services/auth.service';
import { getVenues, createEvent, getEvent, editEvent } from '../../utilities/api';
import { checkPermission } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';
import { CreateEventButtons } from '../CreateEventButtons';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function BasicInfoWrapper({ eventId }) {

    const navigate = useNavigate();
    const organization = AuthService.getOrg()[0];
    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

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
        display_start_time: true,
        hide_doors_open: true,
        hide_end_date: true
    })

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {

        setHasPermission(checkPermission(getPermissions(), 1));

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
                if (res?.data?.doorsOpen) setDoorsOpen(moment(res?.data?.doorsOpen).toDate())
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

    // validation for doors open when doors open changes
    useEffect(() => {
        if (!event.hide_doors_open) {
            setTimeError(doorsOpen.getTime() >= eventStart.getTime())
        }
    }, [doorsOpen, event.hide_doors_open])

    // always set doors open an hour behind event start 
    useEffect(() => {
        if (!event.hide_doors_open) {
            const eventStartTime = moment(eventStart).subtract(1, 'h')
            setDoorsOpen(new Date(eventStartTime))
        }

    }, [event.hide_doors_open, eventStart])

    // always set event end 3 hours ahead of event start 
    useEffect(() => {
        if (!event.hide_end_date) {
            const eventStartTime = moment(eventStart).add(3, 'h')
            setEventEnd(new Date(eventStartTime))
        }

    }, [event.hide_end_date, eventStart])

    useEffect(() => {
        // Listens for changes on event

    }, [event])

    useEffect(() => {
        if (initialState?.event !== event) setShowFooter(true)
        else setShowFooter(false)

    }, [initialState, event.presentedBy, event.name, event.venue, event.display_start_time, event.hide_end_date, event.hide_doors_open])

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
        data['hide_end_date'] = event.hide_end_date;
        data['doorsOpen'] = moment(doorsOpen).format();
        data['hide_doors_open'] = event.hide_doors_open;
        data['display_start_time'] = event.display_start_time;

        if (eventId) {
            data['uuid'] = eventId;
            if (isNaN(data.venue)) data['venue'] = event.venue.id
            editEvent({ data })
                .then((res) => {
                    setIsSaving(false)
                    window.scrollTo(0, 0)
                    setAlert({
                        show: true,
                        variant: 'success',
                        message: 'Your info has been updated.'
                    })
                })
                .catch((err) => {
                    console.error(err)
                    window.scrollTo(0, 0)
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
                    setAlert({
                        show: true,
                        variant: 'danger',
                        message: 'Unable to save info please try again.'
                    })
                })
        }
    }

    return (
        <div className='position-relative'>
            <section className={`wrapper event-form ${!hasPermission ? 'overlay' : ''}`}>
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
                        <Location event={event} handleChange={handleChange} venues={venues} />
                    </Card>
                </section>
            </section>

            {showFooter && (
                <CreateEventButtons isEditing={eventId ? true : false} isDisabled={hasError || timeError || !event.name || !event.venue} isSaving={isSaving} handleSave={handleSave} styles={`${!eventId ? 'without-sidebar' : ' '} ${!hasPermission ? 'overlay' : ''} `} />
            )
            }

            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
