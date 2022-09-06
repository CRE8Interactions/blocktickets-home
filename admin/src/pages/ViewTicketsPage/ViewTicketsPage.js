import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTicketDetails } from '../../utilities/api';

import { TicketsWrapper } from "../../components";

export default function ViewTicketsPage() {

    const { uuid } = useParams()

    const [tickets, setTickets] = useState()

    useEffect(() => {
        getTicketDetails(uuid)
            .then((res) => setTickets(res.data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <TicketsWrapper tickets={tickets} />
    )
}