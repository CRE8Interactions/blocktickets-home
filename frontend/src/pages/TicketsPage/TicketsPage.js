import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TicketContext from '../../context/Ticket/Ticket';

import { getAllEventTickets } from '../../utilities/api';

import { Event, PurchaseTickets } from '../../components';

export default function TicketsPage() {
    let { id } = useParams();

    const [
        event,
        setEvent
    ] = useState();
    const [
        tickets,
        setTickets
    ] = useState();
    const [
        listings,
        setListings
    ] = useState();
    const [
        generalAdmissionCount,
        setGaCount
    ] = useState();
    const [
        generalAdmissionTicket,
        setGaTicket
    ] = useState();
    const [
        reSaleTickets,
        setResaleTickets
    ] = useState();

	useEffect(() => {
		getAllEventTickets(id)
			.then((res) => {
				setTickets(res.data?.tickets)
				setEvent(res.data?.event)
                setListings(res.data?.listings)
			})
			.catch((err) => console.error(err))
	}, [id])

    return (
        <div className="full-height-wrapper">
            <TicketContext.Provider value={{ tickets, listings, generalAdmissionCount, generalAdmissionTicket, reSaleTickets }}>
                <div className="pt-md-3">
                    <Event event={event} />
                </div>
                <PurchaseTickets />
            </TicketContext.Provider>
        </div>
    );
}
