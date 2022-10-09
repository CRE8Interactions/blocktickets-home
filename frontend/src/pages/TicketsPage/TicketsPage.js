import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import TicketContext from '../../context/Ticket/Ticket';

import { getAllEventTickets, getTaxRates } from '../../utilities/api';

import { Event, PurchaseTickets } from '../../components';

export default function TicketsPage() {
    let { id } = useParams();

    // A custom hook that builds on useLocation to parse
    // the query string for you.
    function useQuery() {
    const { search } = useLocation();
  
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    let code = query.get("code") ? query.get("code") : 0;

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
    const [
        taxRates,
        setTaxRates
    ] = useState();
    const [
        feeStructure,
        setfeeStructure
    ] = useState();

	useEffect(() => {
		getAllEventTickets(id, code)
			.then((res) => {
                setfeeStructure(res.data.event.fee_structure)
				setTickets(res.data?.tickets)
				setEvent(res.data?.event)
                setListings(res.data?.listings)
                eventTaxRates(res.data?.event?.venue?.address[0]?.city, res.data?.event?.venue?.address[0]?.state)
			})
			.catch((err) => console.error(err))
        
            

            
	}, [id, code])

    const eventTaxRates = (city, state) => {
        getTaxRates(city, state)
                .then((res) => setTaxRates(res?.data?.sales_tax_rates[0]))
                .catch((err) => console.error(err))
    }

    return (
        <div className="full-height-wrapper">
            <TicketContext.Provider value={{ tickets, listings, generalAdmissionCount, generalAdmissionTicket, reSaleTickets }}>
                <div className="pt-md-3">
                    <Event event={event} />
                </div>
                <PurchaseTickets code={code} taxRates={taxRates} feeStructure={feeStructure} />
            </TicketContext.Provider>
        </div>
    );
}
