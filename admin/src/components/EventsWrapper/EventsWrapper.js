import React, { useEffect, useContext, useState } from 'react';

import OrganizationContext from '../../context/Organization/Organization';
import { publishEvent } from '../../utilities/api';

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { SearchBar } from './SearchBar';
import { EventsTable } from './EventsTable';

import './eventsWrapper.scss';

export default function EventsWrapper() {
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

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setStep(1);
        setShow(true);
    };

    const fullscreen = useState(true);
    const orgs = useContext(OrganizationContext);

    const addTickets = (event) => {
        setStep(3);
        setShow(true);
        setEvent(event);
    };

    return (
        <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
            <div className="flex-wrap d-flex align-items-center justify-content-between" id="events-header">
                <div className="section-heading mb-5 gap-4">
                    <h1>Events</h1>
                    <SearchBar />
                </div>

                <Nav as="ul" variant="pills" className="ms-auto mb-5">
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
                        <EventsTable handleTicketShow={addTickets} type={key} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="draft">
                        <EventsTable handleTicketShow={addTickets} type={key} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="past">
                        <EventsTable handleTicketShow={addTickets} type={key} />
                    </Tab.Pane>
                </Tab.Content>
            </div>
        </Tab.Container>

        //  <CreateEvent
        // 	show={show}
        // 	handleClose={handleClose}
        // 	fullscreen={fullscreen}
        // 	orgs={orgs}
        // 	step={step}
        // 	myEvent={event}
        // />
    );
}
