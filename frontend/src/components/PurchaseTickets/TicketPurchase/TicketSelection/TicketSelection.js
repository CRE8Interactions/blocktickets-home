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

    // min total ticket count of all standard tickets 
    const [minTotalTicketCount, setMinTotalTicketCount] = useState(1)

    // max total ticket count of all standard tickets 
    const [maxTotalTicketCount, setMaxTotalTicketCount] = useState(8)

    // flag for displaying no filtered matches 
    // set to 0 when no ticket types are selected otherwise ticket count when filters are on/off
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

    // tickets for resale - don't use 
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

        handleTotalTicketCount(tickets?.tickets)
        setGaTicketsAvailable(availableCountGA)
        setGaTickets(gaTickets)
        setAvailableTickets(sortBy(tickets?.tickets))
        setResaleTickets(tickets?.reSaleTickets)
        setListings(sortBy(tickets.listings, true));
        if (!tickets?.tickets) return;

        // if no resale tickets turn off resale ticket type in filters
        if (tickets?.listings?.length === 0) {
            setTicketFilters((prevState) => ({
                ...prevState,
                resale: false
            }));
        }

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

            // if there are ticket types selected
            if (ticketFilters.standard || ticketFilters.resale) {

                // set total ticket quantity when filtering
                // always base total ticket quantity off of available tickets
                handleTotalTicketCount(tickets?.tickets)

                // filter tickets based on selected ticket quantity 
                // always filter the available tickets where min ticket quantity is less than selected ticket quantiy and only filter resale tickets when turned on 
                setAvailableTickets(tickets?.tickets.filter(ticket => ticket.minimum_quantity <= ticketCount))
                // quantity is equal to selected ticket quantity
                ticketFilters.resale && setListings(tickets?.listings.filter(ticket => ticket.quantity === ticketCount))

                // always take the ticket count of the filtered available tickets but only add the filtered resale tickets if turned on 
                setFilteredTicketCount([tickets?.tickets.filter(ticket => ticket.minimum_quantity <= ticketCount).length, ticketFilters.resale && tickets?.listings?.filter(ticket => ticket.quantity === ticketCount).length].reduce((acc, cur) => acc + cur, 0));
            }

            // if no ticket types selected
            else if (!ticketFilters.standard && !ticketFilters.resale) {
                handleTotalTicketCount(tickets?.tickets)
                setFilteredTicketCount(0)
            }
        },
        [
            sliderValues, ticketCount, ticketFilters
        ]
    );

    // set total ticket count filtered or not 
    const handleTotalTicketCount = arr => {
        let property;

        // only resale tickets 
        if (!ticketFilters.standard && ticketFilters.resale) {
            arr = tickets?.listings;
            property = 'quantity'
        }
        const minTotalTicketCount = Math.min.apply(Math, arr?.map(ticket => ticket[property || 'minimum_quantity']));

        const maxTotalTicketCount = Math.max.apply(Math, arr?.map(ticket => ticket[property || 'maximum_quantity']));

        setMinTotalTicketCount(minTotalTicketCount)
        setMaxTotalTicketCount(maxTotalTicketCount)

        // sync up filtered ticket count with max ticket count 
        setFilteredTicketCount(maxTotalTicketCount)
    }

    // sort tickets from least expensive to most expensive  
    const sortBy = (arr, isListing) => {
        return arr?.sort(function (a, b) {
            if (isListing) {
                a = a.askingPrice;
                b = b.askingPrice
            } else {
                a = a.cost;
                b = b.cost
            }
            return a - b
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
                            <FilterMenu show={showFilter} handleShow={handleShow} sliderValues={sliderValues} setSliderValues={setSliderValues}
                                showResale={listings.length > 0}
                                ticketFilters={ticketFilters} setTicketFilters={setTicketFilters} />
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
                                                        {availableTickets && ticketFilters.standard && availableTickets?.map((ticket, index) => {
                                                            return <Ticket ticket={ticket} handleNext={handleNext} ticketFilters={ticketFilters} key={index} taxRates={taxRates} feeStructure={feeStructure} />
                                                        })
                                                        }
                                                        <>
                                                            {listings && ticketFilters.resale && listings.map((listing, index) => <Ticket key={index} handleNext={handleNext} ticketFilters={ticketFilters} listing={listing} taxRates={taxRates} feeStructure={feeStructure} />)
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