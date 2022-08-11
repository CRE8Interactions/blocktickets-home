import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';
import { BackButton } from '../BackButton';

export default function TicketsWrapper({ handleAction, handleGoBack, handleNext }) {

    const navigate = useNavigate();

    const handleAdd = () => {
        handleAction ? handleAction('add') : navigate('create')
    }
    // for step 4 - this state will come from database 
    const [tickets] = useState([
        {
            id: 0,
            type: 'General Admission',
            status: 'on_sale',
            desc: 'Ends May 3, 2022 at 12:00 AM',
            ticketsSold: '100/300',
            price: 50
        },
        {
            id: 1,
            type: 'General Admission',
            status: 'scheduled',
            desc: 'Starts April  12, 2022 at 12:00 AM',
            ticketsSold: '100/300',
            price: 50
        },
        {
            id: 2,
            type: 'General Admission',
            status: 'sale_ended',
            ticketsSold: '100/300',
            price: 50
        }
    ])
    return (
        <section className='max-width-wrapper'>
            <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                <h1>Tickets</h1>
                <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={handleAdd}>Add ticket</Button>
            </header>
            <Tickets tickets={tickets} handleAction={handleAction} />
            {tickets && tickets.length > 0 && (
                <Stack direction="horizontal" className="btn-group-flex">
                    <BackButton handleGoBack={handleGoBack} />
                    <Button className="btn-next" size="lg" onClick={handleNext}>Continue</Button>
                </Stack>
            )}
        </section>
    );
}
