import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { publishEvent } from "../../utilities/api";
import OrganizationContext from '../../context/Organization/Organization';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BackButton } from '../BackButton';
import { CreateTicket } from './CreateTicket';
import { Tickets } from './Tickets';
import { BasicInfoWrapper } from '../BasicInfoWrapper';
import { DetailsWrapper } from '../DetailsWrapper';
import { PublishWrapper } from '../PublishWrapper';

import './createEventWrapper.scss';

export default function CreateEventWrapper() {

    let navigate = useNavigate();

    const [
        step,
        setStep
    ] = useState(1);

    const [editId, setEditId] = useState()
    const [action, setAction] = useState()

    const [events, setEvents] = useState()

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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])


    // step processing: add, edit, save each step 
    const handleClick = () => {
        setAction('')
        setStep(step + 1)
    }

    const handleAction = (action, id) => {
        setStep(3);
        setAction(action)
        action === 'edit' ? setEditId(id) : setEditId('')
    }

    const publish = (event) => {
        publishEvent(event)
            .then((res) => {
                let updateEvent = events.find(e => e.id === event.id)
                updateEvent.status = 'on_sale'
                navigate('/dashboard/123')
            })
            .catch((err) => console.error(err))
    }

    const handleGoBack = () => {
        if (action === 'edit' || action === 'add') {
            setStep(step + 1)
        } else {
            setStep(step - 1);
        }
    };

    const fullscreen = useState(true);
    const orgs = useContext(OrganizationContext);

    const handleChange = (e) => { }

    return (
        <div className={` ${step !== 4 ? 'wrapper' : ''}`} id="create-event">
            {step === 1 && (
                <>
                    <BasicInfoWrapper handleChange={handleChange} />
                    <Stack direction="horizontal" className="btn-group-flex">
                        <Button className="btn-next" size="lg" onClick={handleClick}>Save and continue</Button>
                    </Stack>
                </>
            )}

            {step === 2 && (
                <>
                    <DetailsWrapper handleChange={handleChange} />
                    <Stack direction="horizontal" className="btn-group-flex">
                        <BackButton handleGoBack={handleGoBack} />
                        <Button className="btn-next" size="lg" onClick={handleClick}>Save and continue</Button>
                    </Stack>
                </>
            )}

            {step === 3 && (
                <>
                    <section>
                        <header className="section-header-sm section-heading section-heading--secondary">
                            <h1>{action === 'edit' ? 'Edit ticket' : 'Create a ticket'}</h1>
                        </header>
                        <Card body className='card--sm'>
                            <CreateTicket handleChange={handleChange} editId={editId} />
                        </Card>
                    </section>
                    <Stack direction="horizontal" className="btn-group-flex">
                        <>
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={handleClick}>{action === 'edit' ? 'Save' : 'Create ticket'}</Button>
                        </>
                    </Stack>
                </>
            )}
            {step === 4 && (
                <>
                    <section>
                        <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                            <h1>Tickets</h1>
                            <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => handleAction('add')}>Add ticket</Button>
                        </header>
                        <Tickets tickets={tickets} handleAction={handleAction} />
                    </section>
                    {tickets && tickets.length > 0 && (
                        <Stack direction="horizontal" className="btn-group-flex">
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={handleClick}>Continue</Button>
                        </Stack>
                    )}
                </>
            )}

            {step === 5 && (
                <>
                    <PublishWrapper />
                    <Stack direction="horizontal" className="btn-group-flex ">
                        <>
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={publish}>Publish</Button>
                        </>
                    </Stack>
                </>
            )}
        </div>
    );
}
