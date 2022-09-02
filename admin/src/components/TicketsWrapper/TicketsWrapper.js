import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';

export default function TicketsWrapper({ tickets }) {

    const navigate = useNavigate();

    return (
        <section className='max-width-wrapper'>
            <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                <h1>Tickets</h1>
                <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => navigate('create')}>Add ticket</Button>
            </header>
            <Tickets tickets={tickets} />
        </section>
    );
}
