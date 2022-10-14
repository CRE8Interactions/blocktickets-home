import React, { useEffect } from 'react';

import { ticketPrices, formatCurrency } from '../../../../../utilities/helpers';

import ListGroup from 'react-bootstrap/ListGroup';

export default function Ticket({ ticket, handleNext, ticketFilters, listing, taxRates, feeStructure }) {
    let ticketPrice;
    let ticketPriceWithFees;
    let ticketName;
    let ticketType;
    let ticketFee;

    useEffect(() => {
        // Some actions
    }, [ticket, taxRates, feeStructure])

    const ticketTypes = (ticket) => {
        if (!ticket?.resale && ticket?.on_sale_status === 'available') return 'Standard Ticket';
        if (!ticket?.resale && ticket?.on_sale_status === 'presale') return 'Presale';
        if (ticket?.resale && ticket?.on_sale_status === 'resaleAvailable') return 'Resale Ticket';
    };

    if (ticket) {
        let prices = ticketPrices(ticket, listing, true, taxRates, feeStructure);
        ticketPrice = prices.ticketCost;
        ticketName = prices.ticketName;
        ticketType = prices.ticketType;
        ticketFee = prices.totalFees;
        ticketPriceWithFees = prices.ticketCostWithFees;
    }

    if (listing) {
        let prices = ticketPrices(ticket, listing, true, taxRates, feeStructure);
        ticketPrice = prices.ticketCost;
        ticketName = prices.ticketName;
        ticketType = `Resale ${listing.tickets.length} Tickets`;
        ticketFee = prices.totalFees;
        ticketPriceWithFees = prices.ticketCostWithFees;
    }

    return (
        <ListGroup.Item
            onClick={() => handleNext(ticket ? ticket : null, listing ? listing : null)}
            action
            as="li"
            className="d-flex justify-content-between align-items-center">
            <div>
                <div>
                    <span className="fw-bold p-0">{ticketName}</span>
                </div>
                <div>
                    <span className="text-muted caption">{ticketType}</span>
                </div>
            </div>
            <div className="text-end">
                <div>
                    <span className="fw-bold text-end">
                        {ticketFilters.showFees ? (
                            `${formatCurrency(ticketPriceWithFees)} ea`
                        ) : (
                            `${formatCurrency(ticketPrice)} ea`
                        )}
                    </span>
                </div>
                <div>
                    {ticketFilters.showFees && (
                        <span className="text-muted caption">
                            {formatCurrency(ticketPrice)} + {formatCurrency(ticketFee)} Fees
                        </span>
                    )}
                </div>
            </div>
        </ListGroup.Item>
    );
}
