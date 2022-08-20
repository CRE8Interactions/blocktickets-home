import React, { useEffect, useState } from 'react';
import { TicketsWrapper } from "../../components";
import { getEvent } from '../../utilities/api';
import { useParams } from 'react-router-dom';

export default function ViewTicketsPage() {
    const { uuid } = useParams()
    const [tickets, setTickets] = useState()

    useEffect(() => {
        getEvent(uuid)
            .then((res) => setTickets(res.data?.tickets))
            .catch((err) => console.error(err))
    }, [])
    return (
        <>
            <TicketsWrapper tickets={tickets} />
        </>
    )
}