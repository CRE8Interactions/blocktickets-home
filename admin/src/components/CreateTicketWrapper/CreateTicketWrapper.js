import React from 'react';

import Card from 'react-bootstrap/Card';

import { CreateTicket } from './CreateTicket';

export default function CreateTicketWrapper({ id, ticketId }) {

    const handleChange = (e) => { }

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>{id || ticketId ? 'Edit' : 'Create'} ticket</h1>
            </header>
            <Card body className='card--sm'>
                <CreateTicket handleChange={handleChange} ticketId={ticketId} />
            </Card>
        </section>
    );
}
