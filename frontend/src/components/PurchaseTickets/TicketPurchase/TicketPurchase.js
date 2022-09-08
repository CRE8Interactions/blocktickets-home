import React, { useState } from 'react';

import { TicketSelection } from './TicketSelection';
import { TicketConfirmation } from './TicketConfirmation';
import { TicketPresale } from './TicketPresale';

import './ticketPurchase.scss';

export default function TicketPurchase({
    handleClick,
    handleGoBack,
    step,
    eventType,
    isZoomed,
    ticket,
    listing,
    code
}) {
    // how many tickets user wants
    const [
        ticketCount,
        setTicketCount
    ] = useState(2);

    return (
        <div className="left-col">
            {step === 'selection' && (
                <TicketSelection
                    handleClick={handleClick}
                    isZoomed={isZoomed}
                    setTicketCount={setTicketCount}
                    ticketCount={ticketCount}
                />
            )}

            {step === 'confirmation' && (
                <TicketConfirmation
                    handleGoBack={handleGoBack}
                    eventType={eventType}
                    ticket={ticket}
                    listing={listing}
                    setTicketCount={setTicketCount}
                    ticketCount={ticketCount}
                    code={code}
                />
            )}

            {step === 'presale' && <TicketPresale handleClick={handleClick} />}
        </div>
    );
}
