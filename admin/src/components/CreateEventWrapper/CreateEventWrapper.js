import React, { useEffect, useContext, useState } from 'react';

import OrganizationContext from '../../context/Organization/Organization';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BackButton } from '../BackButton';
import { BasicInfo } from './BasicInfo';
import { DateTime } from './DateTime';
import { Location } from './Location';
import { UploadEventImage } from './UploadEventImage';
import { TextEditor } from './TextEditor';
import { CreateTicket } from './CreateTicket';
import { Tickets } from './Tickets';
import { PublishEvent } from './PublishEvent';

import './createEventWrapper.scss';

export default function CreateEventWrapper() {

    const [
        show,
        setShow
    ] = useState(false);
    const [
        step,
        setStep
    ] = useState(1);

    const [
        event,
        setEvent
    ] = useState();

    const [editTicket, setEditTicket] = useState()

    // for step 4 - this state will come from database 
    const [tickets] = useState([
        {
            type: 'General Admission',
            status: 'on_sale',
            desc: 'Ends May 3, 2022 at 12:00 AM',
            ticketsSold: '100/300',
            price: 50
        },
        {
            type: 'General Admission',
            status: 'scheduled',
            desc: 'Starts April  12, 2022 at 12:00 AM',
            ticketsSold: '100/300',
            price: 50
        },
        {
            type: 'General Admission',
            status: 'sale_ended',
            ticketsSold: '100/300',
            price: 50
        }
    ])

    const handleClick = () => {
        setStep(step + 1)
    }

    const handleEdit = (ticket) => {
        setStep(3);
        setEditTicket(ticket)
    }

    const handleGoBack = () => {
        setStep(step - 1);
    };

    const fullscreen = useState(true);
    const orgs = useContext(OrganizationContext);

    const handleChange = (e) => { }

    const publish = () => { }

    return (
        <div className={` ${step !== 4 ? 'wrapper' : ''}`}>
            {step === 1 && (
                <div>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Basic info</h1>
                        </div>
                        <Card body className="card--light">
                            <BasicInfo handleChange={handleChange} />
                        </Card>
                    </section>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Date & Time</h1>
                        </div>
                        <Card body className="card--light">
                            <DateTime handleChange={handleChange} />
                        </Card>
                    </section>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Location</h1>
                        </div>
                        <Card body className="card--light">
                            <Location handleChange={handleChange} />
                        </Card>
                    </section>
                    <Stack direction="horizontal" className="justify-content-end btn-group-flex">
                        <Button className="btn-next" size="lg" onClick={handleClick}>Save and continue</Button>
                    </Stack>
                </div>
            )}

            {step === 2 && (
                <div>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Main event image</h1>
                        </div>
                        <Card body className="card--light">
                            <UploadEventImage handleChange={handleChange} />

                        </Card>
                    </section>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Event description</h1>
                        </div>
                        <Card body className="card--light">
                            <TextEditor handleChange={handleChange} />
                        </Card>
                    </section>
                    <Stack direction="horizontal" className="justify-content-end btn-group-flex">
                        <Button className="btn-next" size="lg" onClick={handleClick}>Save and continue</Button>
                    </Stack>
                </div>
            )}

            {step === 3 && (
                <div>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>{editTicket ? 'Edit ticket' : 'Create a ticket'}</h1>
                        </div>
                        <Card body className="card--light">
                            <CreateTicket handleChange={handleChange} editTicket={editTicket} />
                        </Card>
                    </section>
                    <Stack direction="horizontal" className="justify-content-end btn-group-flex">
                        <>
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={handleClick}>{editTicket ? 'Save' : 'Create ticket'}</Button>
                        </>
                    </Stack>
                </div>
            )}
            {step === 4 && (
                <div>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Tickets</h1>
                            <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => setStep(3)}>Add ticket</Button>
                        </div>
                        <Tickets tickets={tickets} handleEdit={handleEdit} />
                    </section>
                    {tickets && tickets.length > 0 && (
                        <Stack direction="horizontal" className="justify-content-end mt-5 btn-group-flex">
                            <Button className="btn-next" size="lg" onClick={handleClick}>Continue</Button>
                        </Stack>
                    )}
                </div>
            )}

            {step === 5 && (
                <div>
                    <section>
                        <div className="section-heading section-heading--secondary">
                            <h1>Publish event</h1>
                        </div>
                        <Card body className="card--light">
                            <PublishEvent />
                        </Card>
                    </section>
                    <Stack direction="horizontal" className="justify-content-end btn-group-flex">
                        <>
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={publish}>Publish</Button>
                        </>
                    </Stack>
                </div>
            )}

        </div>
    );
}
