import React, { useLayoutEffect, useState } from 'react';

import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets({code}) {
    // 1 - ticket selection
    // 2 - ticket confirmation
    // 3 - presale
    const steps = {
        selection: 1,
        confirmation: 2,
        presale: 3
    };

    const [
        step,
        setStep
    ] = useState('selection');

    // better way? - only on seated map
    const [
        isZoomed,
        setIsZoomed
    ] = useState(false);

    // current ticket
    const [
        ticket,
        setTicket
    ] = useState();

    // current listing
    const [
        listing,
        setListing
    ] = useState();

    useLayoutEffect(
        () => {
            const el = document.querySelector('#main-container');
            fullHeightContainer(el)

            return () => {
                removeFullHeightContainer(el)
            }
        },
        []
    );

    // demo purposes: will come from database 
    const eventType = "genAdmission";

    const handleClick = (step, ticket, listing) => {
        // find key
        setStep(Object.keys(steps).find((key) => key === step));
        if (ticket) setTicket(ticket);
        if (listing) setListing(listing)
    };

    const handleGoBack = () => {
        let curStep = steps[step];
        const prevStep = --curStep;

        // find key based on value
        setStep(Object.keys(steps).find((key) => steps[key] === prevStep));
        setListing(null)
        setTicket(null)
    };

    return (
        <div className="pt-md-3 flex d-flex flex-column flex-md-row">
            <SeatingMap
                styles={(step === 'confirmation' || step === 'presale') && 'tablet-desktop-only'}
                setIsZoomed={setIsZoomed}
                eventType={eventType}
            />

            <TicketPurchase
                handleClick={handleClick}
                handleGoBack={handleGoBack}
                step={step}
                isZoomed={isZoomed}
                eventType={eventType}
                ticket={ticket}
                listing={listing}
                code={code}
            />
        </div>
    );
}
