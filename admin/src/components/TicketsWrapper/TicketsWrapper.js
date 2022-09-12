import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';

export default function TicketsWrapper({ tickets, eventId }) {

    const navigate = useNavigate();

    return (
        <section className='max-width-wrapper'>
            <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                <h1>Tickets</h1>
                <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => navigate('create')}>Add ticket</Button>
            </header>
            <Tickets tickets={tickets} />
            <Stack direction="horizontal" className="btn-group-flex">
                <Link to={`/myevent/${eventId}/publish`} className='btn btn-primary btn-lg btn-next'>Publish</Link>
            </Stack>
        </section>
    );
}
