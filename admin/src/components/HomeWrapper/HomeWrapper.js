import React, { useContext, useState } from 'react';

import OrganizationContext from '../../context/Organization/Organization';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { SearchBar } from '../SearchBar';
import { EventsTable } from './EventsTable';

import './homeWrapper.scss';

export default function HomeWrapper({ events }) {
    const [
        key,
        setKey
    ] = useState('published');

    const [
        show,
        setShow
    ] = useState(false);
    const [
        step,
        setStep
    ] = useState();
    const [
        event,
        setEvent
    ] = useState();

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setStep(1);
        setShow(true);
    };

    const fullscreen = useState(true);
    const orgs = useContext(OrganizationContext);

    const handleSearch = (query) => { }

    return (
        <Card body>
            <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                <div className="flex-wrap d-flex align-items-center   justify-content-between" id="events">
                    <div className="section-header section-heading section-heading--flex gap-4">
                        <h1>Events</h1>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="sm" placeholder="Search events" />
                    </div>
                    <Nav as="ul" variant="pills" className="ms-auto" justify>
                        <Nav.Item as="li">
                            <Nav.Link as="button" eventKey="published">
                                Published
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as="button" eventKey="draft">
                                Draft
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as="button" eventKey="past">
                                Past
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="published">
                            <EventsTable type={key} events={events} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="draft">
                            <EventsTable type={key} events={events} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="past">
                            <EventsTable type={key} events={events} />
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </Tab.Container>
        </Card>
    );
}
