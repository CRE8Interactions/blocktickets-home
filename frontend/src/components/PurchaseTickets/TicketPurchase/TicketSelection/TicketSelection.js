import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import TicketContext from '../../../../context/Ticket/Ticket';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { PriceRangeSlider } from './PriceRangeSlider';
import { FilterMenu } from './FilterMenu';
import { Ticket } from './Ticket';
import { MyTickets } from './MyTickets';
import { TicketPurchaseFooter } from '../TicketPurchaseFooter';
import { NotAvailableMessage } from './NotAvailableMessage';

import './ticketSelection.scss';

export default function TicketSelection({ handleClick, isZoomed, setTicketCount, ticketCount, taxRates, feeStructure }) {

    const tickets = useContext(TicketContext);

    const [
        ticketFilters,
        setTicketFilters
    ] = useState({ showFees: true, standard: true, resale: true });

    const [
        sliderValues,
        setSliderValues
    ] = useState([0, 50]);

    const [
        originalValues,
        setOriginalValues
    ] = useState([0, 50]);

    const [
        showFilter,
        setShowFilter
    ] = useState(false);

    const [minTotalTicketCount, setMinTotalTicketCount] = useState(1)

    const [maxTotalTicketCount, setMaxTotalTicketCount] = useState(8)

    const [
        filteredTicketCount,
        setFilteredTicketCount
    ] = useState(1);

    // general admission ticket count 
    const [
        gaTicketsAvailable,
        setGaTicketsAvailable
    ] = useState(0)

    // general admission tickets - don't use 
    const [
        gaTickets,
        setGaTickets
    ] = useState({})

    // all tickets - used to display tickets
    const [
        availableTickets,
        setAvailableTickets
    ] = useState({})

    // tickets for resale 
    const [
        resaleTickets,
        setResaleTickets
    ] = useState({})

    // tickets listed for sale - used to display tickets 
    const [
        listings,
        setListings
    ] = useState({})

    const [showGa, setShowGa] = useState(true);

    useEffect(() => {
        const availableCountGA = parseInt(tickets?.tickets?.filter((ticket) => ticket.generalAdmission === true)?.reduce((accumulator, object) => {
            return accumulator + (object.availableCount);
        }, 0));

        const gaTickets = tickets?.tickets?.filter((ticket) => ticket.generalAdmission === true)

        const minTotalTicketCount = Math.min.apply(Math, tickets?.tickets?.map(ticket => ticket.minimum_quantity));

        const maxTotalTicketCount = Math.max.apply(Math, tickets?.tickets?.map(ticket => ticket.maximum_quantity));

        setMinTotalTicketCount(minTotalTicketCount)
        setMaxTotalTicketCount(maxTotalTicketCount)
        setGaTicketsAvailable(availableCountGA)
        setGaTickets(gaTickets)
        setAvailableTickets(sortBy(tickets?.tickets))
        setResaleTickets(tickets?.reSaleTickets)
        setListings(sortBy(tickets.listings));
        if (!tickets?.tickets) return;

        // let higestResalePrice;

        // if (tickets?.listings && tickets?.listings.length > 0) {
        //     higestResalePrice = tickets?.listings?.map(listing => listing.askingPrice + listing.tickets[0].fee).reduce((a, b) => Math.max(a, b))
        // }
        // let higestPrice = tickets?.listings && tickets?.listings?.length > 0 ? higestResalePrice : tickets.generalAdmissionTicket?.attributes?.cost + tickets.generalAdmissionTicket?.attributes?.fee + tickets.generalAdmissionTicket?.attributes?.facilityFee;
        // let lowestPrice = tickets.generalAdmissionTicket?.attributes?.cost + tickets.generalAdmissionTicket?.attributes?.fee + tickets.generalAdmissionTicket?.attributes?.facilityFee;
        let lowestPrice = Math.min.apply(Math, tickets?.tickets.map(function (o) { return o.cost; }));
        let higestPrice = Math.max.apply(Math, tickets?.tickets.map(function (o) { return o.cost; }));

        setSliderValues([lowestPrice, higestPrice])
        setOriginalValues([lowestPrice, higestPrice])
    }, [tickets, gaTicketsAvailable]);

    useEffect(
        () => {
            // if no ticket type is selected, display filter message 
            if (!tickets || !tickets.listings) return;
            // console.log('Filtered ', tickets)
            // console.log('SV0 ', sliderValues[0])
            // console.log('SV1 ', sliderValues[1])
            // console.log('GA Tickets ', gaTickets)
            // let filteredlisting = tickets.listings.filter(listing => listing.tickets.length >= ticketCount && (listing.askingPrice + listing.tickets[0].fee) >= sliderValues[0] && (listing.askingPrice + listing.tickets[0].fee) <= sliderValues[1]);
            // setListings(filteredlisting);
            // if (tickets.generalAdmissionTicket && (tickets.generalAdmissionTicket.attributes.cost + tickets.generalAdmissionTicket?.attributes?.fee + tickets.generalAdmissionTicket?.attributes?.facilityFee) >= sliderValues[0] && (tickets.generalAdmissionTicket.attributes.cost + tickets.generalAdmissionTicket?.attributes?.fee + tickets.generalAdmissionTicket?.attributes?.facilityFee) <= sliderValues[1] && ticketFilters.standard) {
            //     setShowGa(true)
            //     setFilteredTicketCount(1)
            // } else if (tickets.listings && ticketFilters.resale) {
            //     setShowGa(false)
            //     if (filteredlisting.length === 0) setFilteredTicketCount(0)
            //     if (filteredlisting.length > 0) setFilteredTicketCount(1)
            // } else if (!ticketFilters.standard && !ticketFilters.resale) {
            //     setFilteredTicketCount(0)
            // }
        },
        [
            sliderValues, ticketCount, ticketFilters
        ]
    );

    // sort tickets from least expensive to most expensive  
    const sortBy = (arr) => {
        return arr?.sort(function (a, b) {
            return a.cost - b.cost
        })
    }

    const handleShow = () => {
        setShowFilter(!showFilter);
    }

    const selectOptions = () => {
        let options = [];
        for (let i = minTotalTicketCount; i <= maxTotalTicketCount; i++) {
            options.push({ key: i, value: i, name: i === 1 ? `${i} Ticket` : `${i} Tickets` })
        }
        return options;
    }

    const handleNext = (ticket, listing = {}) => {
        if (ticket && ticket.on_sale_status === 'available') handleClick('confirmation', ticket, null)
        if (listing && !ticket) handleClick('confirmation', null, listing)
    }

    return (
        <Fragment>
            {/* if there are tickets or listing tickets */}
            {(gaTicketsAvailable && gaTicketsAvailable >= 1) || (listings && listings.length > 0) ? (
                <Fragment>
                    <header>
                        <Stack direction="horizontal" gap={2} className="option-btns">
                            <Form.Select
                                aria-label="Number of Tickets"
                                value={ticketCount}
                                onChange={(e) => setTicketCount(parseInt(e.target.value))}>
                                {selectOptions().map((o) => {
                                    return <option value={o.key} key={o.key}>{o.name}</option>
                                })}
                            </Form.Select>
                            <Button
                                className="btn--filter"
                                variant="outline-light"
                                onClick={handleShow}>
                                Filter
                            </Button>
                        </Stack>
                        {/* <PriceRangeSlider
                            styles="tablet-desktop-only"
                            sliderValues={sliderValues}
                            setSliderValues={setSliderValues}
                            originalValues={originalValues}
                        /> */}
                    </header>
                    <Stack direction="vertical">
                        {showFilter && (
                            <FilterMenu show={showFilter} handleShow={handleShow} sliderValues={sliderValues} setSliderValues={setSliderValues} ticketFilters={ticketFilters} setTicketFilters={setTicketFilters} />
                        )}
                        {filteredTicketCount > 0 ? (
                            <>
                                {!showFilter && (
                                    <>
                                        {isZoomed && (
                                            <Stack direction="horizontal" className="heading--flex mb-3">
                                                <h3 className="normal--uppercase">Your Tickets (7)</h3>
                                                <Button variant="link" className="text-danger">
                                                    Remove all
                                                </Button>
                                            </Stack>
                                        )}
                                        <div className="tickets-container">
                                            <div className="tickets--scrollable">
                                                {!isZoomed ? (
                                                    <ListGroup as="ul">
                                                        {/* {showGa && ticketFilters.standard && (<Ticket ticket={gaTicket} handleNext={handleNext} ticketFilters={ticketFilters} />)}

                                                        {ticketFilters.resale && (
                                                            <>
                                                                {listings && listings.map((listing, index) => <Ticket key={index} handleNext={handleNext} ticketFilters={ticketFilters} listing={listing} />)
                                                                }
                                                            </>
                                                        )} */}
                                                        {availableTickets && availableTickets?.map((ticket, index) => {
                                                            return <Ticket ticket={ticket} handleNext={handleNext} ticketFilters={ticketFilters} key={index} taxRates={taxRates} feeStructure={feeStructure} />
                                                        })
                                                        }
                                                        <>
                                                            {tickets?.listings && tickets?.listings.map((listing, index) => <Ticket key={index} handleNext={handleNext} ticketFilters={ticketFilters} listing={listing} taxRates={taxRates} feeStructure={feeStructure} />)
                                                            }
                                                        </>
                                                    </ListGroup>
                                                ) : (
                                                    <MyTickets />
                                                )}
                                            </div>
                                        </div>
                                        {isZoomed && (
                                            <TicketPurchaseFooter>
                                                <Link
                                                    to={'/checkout/1'}
                                                    className="btn w-100 btn-primary btn-lg">
                                                    Checkout
                                                </Link>
                                            </TicketPurchaseFooter>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {!showFilter && (
                                    <NotAvailableMessage>
                                        <h1 className="normal">Please adjust your search</h1>
                                        <p>
                                            The seating options you selected aren't available due to the ticket
                                            quantity or filter you applied. Please try adjusting the number of
                                            tickets selected or use the seat map to search for available seats.
                                        </p>
                                    </NotAvailableMessage>
                                )}
                            </>
                        )
                        }
                    </Stack>

                </Fragment>
            ) : (
                <NotAvailableMessage>
                    <h1 className="fs-md">Sorry, tickets are sold out.</h1>
                    <p>Please check back anytime later to see if new tickets appear</p>
                </NotAvailableMessage>
            )}
        </Fragment>
    );
}