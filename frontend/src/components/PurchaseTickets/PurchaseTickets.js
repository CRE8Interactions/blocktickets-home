import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMedia } from './../../utilities/hooks';
import { fullHeightContainer, removeFullHeightContainer } from '../../utilities/helpers';

import { SeatingMap } from './SeatingMap';
import { TicketPurchase } from './TicketPurchase';

import './purchaseTickets.scss';

export default function PurchaseTickets() {
    // 1 - ticket selection
    // 2 - ticket confirmation
    // 3 - presale
    const steps = {
        selection: 1,
        confirmation: 2,
        presale: 3
    };

    const { search } = useLocation();

    let query = new URLSearchParams(search, [
        search
    ]);

    const [
        param
    ] = useState(query.get('type'));

    const [
        step,
        setStep
    ] = useState('selection');

    // state when filter menu is open for layout change
    const [
        isFilterOpen,
        setIsFilterOpen
    ] = useState(false);

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

    const mediaQuery = useMedia('(max-width: 768px');

    // remove full height layout only on ticket selection step, is below tablet size and filter menu is open to allow scrolling on mobile when filter menu is open and for mobile menu to display properly
    // useLayoutEffect(
    //     () => {
    //         const el = document.querySelector('#main-container');

    //         if ((step === 'selection' && isFilterOpen)) {
    //             removeFullHeightContainer(el);
    //         } else {
    //             fullHeightContainer(el)
    //         }
    //     },
    //     [
    //         step,
    //         isFilterOpen
    //     ]
    // );

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
                type={param}
                setIsZoomed={setIsZoomed}
            />

            <TicketPurchase
                handleClick={handleClick}
                handleGoBack={handleGoBack}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                step={step}
                type={param}
                isZoomed={isZoomed}
                ticket={ticket}
                listing={listing}
            />
        </div>
    );
}
