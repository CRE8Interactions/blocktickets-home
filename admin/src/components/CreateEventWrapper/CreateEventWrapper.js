import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { publishEvent } from "../../utilities/api";
import OrganizationContext from '../../context/Organization/Organization';

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
        <div id="create-event">
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
                <TicketsWrapper handleAction={handleAction} handleNext={handleNext} handleGoBack={handleGoBack} />
            )}

            {step === 5 && (
                <PublishWrapper handleNext={handleNext} handleGoBack={handleGoBack} />
            )}
        </div>
    );
}
