import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTicketDetails, getEvent } from '../../utilities/api';

import { TicketsWrapper } from "../../components";

export default function ViewTicketsPage() {

    const { uuid } = useParams()

    const [event, setEvent] = useState();

    const [tickets, setTickets] = useState()

    useEffect(() => {
        getTicketDetails(uuid)
            .then((res) => setTickets(res.data))
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        getEvent(uuid)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err))
    }, [uuid])

    return (
        <TicketsWrapper tickets={tickets} eventStatus={event?.status} eventId={uuid} />
    )
}