import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
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

    const [startDate, setStartDate] = useState(new Date(moment('12:00 pm', 'h:mm a').format()));

    const [endDate, setEndDate] = useState(new Date(moment('1:00 pm', 'h:mm a').format()));

    const [doorsOpenDate, setDoorsOpenDate] = useState(new Date());

    const [errorFields, setErrorFields] = useState();

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
            startDate,
            endDate,
            doorsOpenDate
        })
        getVenues()
            .then((res) => { setVenues(res?.data) })
            .catch((err) => console.error(err))

        if (!eventId) return;

        getEvent(eventId)
            .then((res) => {
                setEvent(res?.data)
                setStartDate(moment(res?.data?.start).toDate())
                setEndDate(moment(res?.data?.end).toDate())
            })
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        // Future event
    }, [event])

    useEffect(() => {
        if (initialState?.event !== event) setShowFooter(true)
        else setShowFooter(false)

    }, [initialState, event.presentedBy, event.name, event.venue, event.timezone, event.displayEndTime])

    // control error messages for start, end and doors open dates 
    useLayoutEffect(() => {
        let fields = [];
        let message = '';

        if (event.displayEventEnd) {
            fields = ['event-end', 'event-start']
            if (endDate.getTime() < startDate.getTime()) {
                message = "Event end date must be after event start date"
                addError(fields, message)
            }
            else {
                removeError(fields)
            }
        }
        else if (event.displayDoorsOpen) {
            fields = ['doors-open', 'event-start']
            if (doorsOpenDate.getDate() !== startDate.getDate()) {
                message = "Doors open date must be on the same day as the event start date"
                addError(fields, message)
            }
            else {
                removeError(fields)
            }
        }

    }, [startDate, endDate, doorsOpenDate])

    const handleChange = (e, val = e.target.value) => {
        setEvent({ ...event, [e.target.name]: val })
    }

    const addError = (fields, message) => {
        setErrorFields([...fields]);
        fields.forEach(field => document.querySelector(`#${field}`).classList.add('error-border'))
        fields.forEach(field => document.querySelector(`.form-text#${field}`).innerHTML = message)
    }

    const removeError = (fields) => {
        fields.forEach(field => document.querySelector(`#${field}`).classList.remove('error-border'))
        fields.forEach(field => document.querySelector(`.form-text#${field}`).innerHTML = '')
        setErrorFields([])
    }

    const handleSave = () => {
        setIsSaving(true)
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
        data['hide_end_date'] = !event?.displayEndTime;
        if (eventId) {
            data['uuid'] = eventId;
            data['venue'] = (Number(event.venue));
            editEvent({ data })
                .then((res) => {
                    navigate(`/myevent/${eventId}/basic-info`)
                    setAlert({
                        show: true,
                        varient: 'success',
                        message: 'Your info has been updated.'
                    })
                })
                .catch((err) => {
                    console.error(err)
                    navigate(`/myevent/${eventId}/basic-info`)
                    setAlert({
                        show: true,
                        varient: 'error',
                        message: 'Unable to save info please try again.'
                    })
                })

        } else {
            createEvent({ data })
                .then((res) => navigate(`/myevent/${res.data?.data?.attributes?.uuid}/details`))
                .catch((err) => {
                    console.error(err)
                    navigate(`/myevent/${eventId}/basic-info`)
                    setAlert({
                        show: true,
                        varient: 'error',
                        message: 'Unable to save info please try again.'
                    })
                })
        }
        setIsSaving(false)
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Basic info</h1>
                    {alert.show &&
                        <>
                            <Alert variant={alert.varient} onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                                {alert.message}
                            </Alert>
                        </>
                    }
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
                    <DateTime event={event} handleChange={handleChange} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} setDoorsOpenDate={setDoorsOpenDate} doorsOpenDate={doorsOpenDate} />
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
            {showFooter && (
                <CreateEventButtons isEditing={eventId ? true : false} isDisabled={errorFields?.length > 0 || !event.name || !event.venue} isSaving={isSaving} handleSave={handleSave} />
            )}
        </section>
    );
}
