import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';

export default function TicketsWrapper({ tickets, eventStatus, eventId }) {

    const navigate = useNavigate();

    return (
        <>
            <section className='max-width-wrapper'>
                <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                    <h1>Tickets</h1>
                    <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => navigate('create')}>Add ticket</Button>
                </header>
                <Tickets tickets={tickets} />
            </section>
            {/* only show if event is not published yet */}
            {eventStatus === "unpublished" && (
                <div className="btn-footer">
                    <Stack direction="horizontal" className="btn-group-flex max-width-wrapper">
                        <Link to={`/myevent/${eventId}/publish`} className='btn btn-primary btn-lg btn-next'>Publish</Link>
                    </Stack>
                </div>
            )}
        </>
    );
}
