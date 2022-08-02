import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { publishEvent } from "../../utilities/api";
import OrganizationContext from '../../context/Organization/Organization';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BackButton } from '../BackButton';
import { BasicInfoWrapper } from '../BasicInfoWrapper';
import { DetailsWrapper } from '../DetailsWrapper';
import { CreateTicketWrapper } from "../CreateTicketWrapper";
import { TicketsWrapper } from "../TicketsWrapper";
import { PublishWrapper } from '../PublishWrapper';

export default function CreateEventWrapper() {

    const navigate = useNavigate();

    const [
        step,
        setStep
    ] = useState(1);

    const [ticketId, setTicketId] = useState()

    const [action, setAction] = useState()

    const [event, setEvent] = useState()

    // for step 4 - to make display of buttons work - delete later
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

    const publish = (event) => {
        publishEvent(event)
            .then((res) => {
                let updateEvent = event.find(e => e.id === event.id)
                updateEvent.status = 'on_sale'
                navigate('/dashboard/123')
            })
            .catch((err) => console.error(err))
    }

    const handleNext = (_, stateObj) => {
        if (step < 5) {
            setAction('')
            setStep(step + 1)
        }
        if (stateObj) {
            setEvent({ ...event, ...stateObj })

            if (step === 5) {
                publish();
            }
        }

    }

    const handleAction = (action, id) => {
        setStep(3);
        setAction(action)
        action === 'edit' ? setTicketId(id) : setTicketId('')
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

    return (
        <div className={` ${step !== 4 ? 'wrapper' : ''}`} id="create-event">
            {step === 1 && (
                <BasicInfoWrapper handleNext={handleNext} />
            )}

            {step === 2 && (
                <DetailsWrapper handleNext={handleNext} handleGoBack={handleGoBack} />
            )}

            {step === 3 && (
                <CreateTicketWrapper ticketId={ticketId} handleGoBack={handleGoBack} handleNext={handleNext} />
            )}
            {step === 4 && (
                <>
                    <TicketsWrapper handleAction={handleAction} />
                    {tickets && tickets.length > 0 && (
                        <Stack direction="horizontal" className="btn-group-flex">
                            <BackButton handleGoBack={handleGoBack} />
                            <Button className="btn-next" size="lg" onClick={handleNext}>Continue</Button>
                        </Stack>
                    )}
                </>
            )}

            {step === 5 && (
                <PublishWrapper handleNext={handleNext} handleGoBack={handleGoBack} />
            )}
        </div>
    );
}
