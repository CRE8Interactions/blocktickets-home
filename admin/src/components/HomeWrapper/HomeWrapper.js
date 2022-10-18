import React, { useEffect, useState } from 'react';

import { getVenues } from '../../utilities/api';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { SearchBar } from '../SearchBar';
import { EventsList } from './EventsList';

import './homeWrapper.scss';

export default function HomeWrapper({ events }) {

    const eventStatusOpt = [
        {
            label: 'Published',
            value: 'published'
        },
        {
            label: 'Draft',
            value: 'draft'
        },
        {
            label: 'Past',
            value: 'past'
        }
    ]

    const [eventStatus, setEventStatus] = useState(eventStatusOpt[0].value)

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleSearch = (query) => { }

    return (
        <section>
            <header className='section-header heading--flex'>
                <div className="section-heading">
                    <h1>Events</h1>
                </div>
                <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} placeholder="Search by order #, data, buyer" />
                {/* <FloatingLabel controlId="venue" label="Venue">
                    <Form.Select name="venue" value={venue} onChange={(e) => setVenue(e.target.value)}>
                        <option disabled hidden value="">Select venue</option>
                        <option value="all">All</option>
                        {venues?.map((option, index) => (
                            <option key={index} value={option.id}>{option.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel> */}
                <FloatingLabel controlId="status" label="Event status">
                    <Form.Select name="status" value={eventStatus} onChange={(e) => setEventStatus(e.target.value)}>
                        {eventStatusOpt.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </header>
            <EventsList events={events} eventStatus={eventStatus} />
        </section>
    );
}
