import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { publishEvent } from "../../utilities/api";
import OrganizationContext from '../../context/Organization/Organization';
import UserContext from '../../context/User/User';
import { getCategories, getVenues, createEvent, createTickets } from '../../utilities/api';

import { BasicInfoWrapper } from '../BasicInfoWrapper';
import { DetailsWrapper } from '../DetailsWrapper';
import { CreateTicketWrapper } from "../CreateTicketWrapper";
import { TicketsWrapper } from "../TicketsWrapper";
import { PublishWrapper } from '../PublishWrapper';

import moment from 'moment';

export default function CreateEventWrapper() {

    const navigate = useNavigate();

    const user = useContext(UserContext)

    const [
        step,
        setStep
    ] = useState(1);

    const [ticketId, setTicketId] = useState()

    const [action, setAction] = useState()

    const [event, setEvent] = useState()

    const [eventImg, setEventImg] = useState()

    const [info, setInfo] = useState()

    const [categories, setCategories] = useState()

    const [venues, setVenues] = useState()

    const [description, setDescription] = useState()

    const [tickets, setTickets] = useState()

    const organization = user?.orgs[0];

    const [publishType, setPublishType] = useState()

    const [publishDate, setPublishDate] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step, publishType, publishDate, event])

    useEffect(() => {
        getCategories()
            .then((res) => {setCategories(res?.data?.data)})
            .catch((err) => console.error(err))
        
        getVenues()
            .then((res) => {setVenues(res?.data)})
            .catch((err) => console.error(err))
    }, [])

    const publish = () => {
        let data = {};
        data['publishType'] = publishType ? publishType : 1;
        data['publishDate'] = moment(publishDate).format();
        data['event'] = event;

        publishEvent({data})
            .then((res) => {
                navigate('/events')
            })
            .catch((err) => console.error(err))
        
    }

    const buildTickets = (ticket, start, end) => {
        const data = {};
        data['name'] = ticket.name;
        data['description'] = ticket.description;
        data['cost'] = parseFloat(ticket.price);
        data['fee'] = parseFloat(ticket.fee);
        data['minimum_quantity'] = Number(ticket.minQuantity);
        data['maximum_quantity'] = Number(ticket.maxQuantity);
        data['minResalePrice'] = parseFloat(ticket.minResalePrice);
        data['maxResalePrice'] = parseFloat(ticket.maxResalePrice);
        data['eventId'] = event.id;
        data['free'] = ticket.price > 0 ? false : true;
        data['generalAdmission'] = ticket.name.match(/general admission/i) ? true : false;
        data['quantity'] = ticket.quantity;
        data['sales_start'] = moment(start).format();
        data['sales_end'] = moment(end).format();

        createTickets({data})
            .then((res) => {setStep(step + 1); setEvent(res.data)})
            .catch((err) => console.error(err))
    }

    const handleNext = (_, stateObj) => {
        if (step === 2) {
            // Creates Event img
            const data = {};
            const formData = new FormData();
            formData.append(`files.image`, eventImg, eventImg.name);
            // formats data for api
            data['name'] = event.title;
            data['summary'] = description;
            data['presentedBy'] = event.presentedBy;
            data['start'] = moment(event.start).format();
            data['end'] = moment(event.end).format();
            data['venue'] = (Number(event.venue))
            data['categories'] = [Number(event.category)]
            data['status'] = 'unpublished';
            data['currency'] = 'usd';
            data['online_event'] = false;
            data['organizationId'] = organization?.id;
            // Send formData
            formData.append('data', JSON.stringify(data));
            createEvent(formData)
                .then((res) => { setEvent(res?.data?.data); setStep(step + 1); console.log(res?.data)})
                .catch((err) => console.error(err))
        }
        if (step <= 2) {
            setStep(step + 1)
        }

        if (step === 4) {
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
                <BasicInfoWrapper handleNext={handleNext} categories={categories} venues={venues} createEvent={createEvent} />
            )}

            {step === 2 && (
                <DetailsWrapper handleNext={handleNext} handleGoBack={handleGoBack} setEventImg={setEventImg} setDescription={setDescription} />
            )}

            {step === 3 && (
                <CreateTicketWrapper ticketId={ticketId} handleGoBack={handleGoBack} handleNext={handleNext} buildTickets={buildTickets} />
            )}
            {step === 4 && (
                <TicketsWrapper handleAction={handleAction} handleNext={handleNext} handleGoBack={handleGoBack} tickets={event?.tickets} />
            )}

            {step === 5 && (
                <PublishWrapper handleNext={handleNext} handleGoBack={handleGoBack} event={event} setPublishType={setPublishType} setPublishDate={setPublishDate} />
            )}
        </div>
    );
}
