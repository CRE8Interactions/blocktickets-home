import React, { Fragment, useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { createOrder, getEvent } from '../../../../utilities/api';
import { formatCurrency } from '../../../../utilities/helpers';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { Disclaimer } from './Disclaimer';
import { Spinner } from '../../../SpinnerContainer/Spinner';
import { Error } from '../../../Error';

import './totalCard.scss';

export default function TotalCard({ setStatus, addOns, setOrder, intentId, paymentDeclined }) {
    const [
        expanded,
        setExpanded
    ] = useState(false);

    const [
        purchasing,
        setPurchasing
    ] = useState(false);

    const [
        hasError,
        setHasError
    ] = useState(false);

    let cart = sessionStorage.getItem('cart');
    if (cart) cart = JSON.parse(cart);

    const stripe = useStripe();
    const elements = useElements();

    let ticketPrice;
    let ticketCount;
    let ticketFee;
    let facilityFee;
    let totalDue;
    let tax;
    let processingFee;
    let times;

    if (cart.listing) {
        times = 1;
        console.log(cart.listing)
        let listing = cart?.listing;
        ticketPrice = listing?.pricing?.ticketCost;
        ticketCount = listing?.quantity;
        ticketFee = listing?.pricing?.serviceFees * listing?.quantity;
        facilityFee = listing?.pricing?.ticketFacilityFee;
        processingFee = listing?.pricing?.paymentProcessingFee * listing?.quantity;
        totalDue = listing?.pricing?.listingTotalWithFees;
        tax = listing?.pricing?.taxPerTicket * listing?.quantity;
    }
    else if (cart.ticket) {
        let ticket = cart?.ticket;
        ticketPrice = ticket?.pricing?.ticketCost;
        ticketCount = cart.ticketCount;
        ticketFee = ticket?.pricing?.serviceFees;
        facilityFee = ticket?.pricing?.ticketFacilityFee;
        processingFee = ticket?.pricing?.paymentProcessingFee;
        totalDue = (ticket?.pricing?.ticketCostWithFeesAndTax) * ticketCount;
        tax = ticket?.pricing?.taxPerTicket * ticketCount;
        times = ticketCount
    }

    const completePurchase = () => {
        setPurchasing(true);
        let data = {
            cart: cart,
            paymentIntentId: intentId
        };

        createOrder(data)
            .then((res) => {
                // Need better way to store order data
                sessionStorage.setItem('order', JSON.stringify(res.data));
                sendPayment();
            })
            .catch((err) => {
                console.error(err);
                setPurchasing(false);
                setHasError(true)
            })
    }

    const sendPayment = async () => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: ''
            },
            redirect: 'if_required'
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setPurchasing(false);
            paymentDeclined(error.message);
            console.warn(error.message);
        }
        else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            setStatus('successful');
        }
    };

    return (
        <Card id="total-card" className={`card-xl card--light card--popup ${expanded && 'card--popup-expanded'}`}>
            <Card.Header className="heading--flex">
                <Card.Title as="h5" className="normal">
                    Total
                </Card.Title>
                <Stack direction="horizontal" gap={2} className="card-header-price">
                    <span className="fw-bold fs-md">{formatCurrency(totalDue)}</span>
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        variant="outline-light"
                        className=" btn--icon btn--icon-sm">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                fill="#777E91"
                            />
                        </svg>
                    </Button>
                </Stack>
            </Card.Header>
            {expanded && (
                <Card.Body>
                    <ul>
                        <li className="list">
                            <p className="heading">Tickets</p>
                            <ul>
                                <Stack direction="horizontal" as="li" className="split-row">
                                    <span>
                                        Tickets: {formatCurrency(ticketPrice)} x {ticketCount}
                                    </span>
                                    <span className="text-end">
                                        {formatCurrency(ticketPrice * ticketCount)}
                                    </span>
                                </Stack>
                            </ul>
                        </li>
                        <li className="list">
                            <p className="heading">Fees</p>
                            <ul>
                                <Stack direction="horizontal" as="li" className="split-row">
                                    <span>
                                        Service Fee: {formatCurrency(ticketFee)} x {times}
                                    </span>
                                    <span className="text-end">
                                        {formatCurrency(ticketFee * times)}
                                    </span>
                                </Stack>
                                <Stack direction="horizontal" as="li" className="split-row">
                                    <span>
                                        Facility Fee: {formatCurrency(facilityFee)} x {times}
                                    </span>
                                    <span className="text-end">
                                        {formatCurrency(facilityFee * times)}
                                    </span>
                                </Stack>
                                <Stack direction="horizontal" as="li" className="split-row">
                                    <span>
                                        Processing Fee: {formatCurrency(processingFee)} x {times}
                                    </span>
                                    <span className="text-end">
                                        {formatCurrency(processingFee * times)}
                                    </span>
                                </Stack>
                            </ul>
                        </li>

                        {addOns.length > 0 && (
                            <li className="list">
                                <p className="heading">Add on</p>
                                <ul>
                                    <Stack direction="horizontal" as="li" className="split-row">
                                        <span>Meet &amp; Greet</span>

                                        <span className="text-end">$45.00</span>
                                    </Stack>
                                    <Stack direction="horizontal" as="li" className="split-row">
                                        <span>Merch</span>

                                        <span className="text-end">$45.00</span>
                                    </Stack>
                                    <Stack direction="horizontal" as="li" className="split-row">
                                        <span>Parking Pass</span>

                                        <span className="text-end">$12.00</span>
                                    </Stack>
                                </ul>
                            </li>
                        )}

                        <li className="split-row list">
                            <span className="heading m-0">Tax</span>
                            <span className="text-end">{formatCurrency(tax)}</span>
                        </li>
                    </ul>
                    <div className="mobile-only mt-4">
                        <Disclaimer />
                    </div>
                </Card.Body >
            )
            }
            <Card.Footer className={`d-flex-column ${expanded && 'with-border'}`}>
                <div className="tablet-desktop-only">
                    <Disclaimer />
                </div>
                <div id="payment-request-button">
                    {/* Need to rethink how payment element and totalCard manage state */}
                    <Button
                        id="payment-btn"
                        variant="primary"
                        size="lg"
                        className="icon-button w-100 d-none"
                        onClick={completePurchase}>
                        {purchasing ? (
                            <Fragment>
                                <Spinner />
                                <span>Purchasing...</span>
                            </Fragment>
                        ) : (
                            <span>Complete Purchase</span>
                        )}
                    </Button>
                </div>

                <div id="payment-request-button">
                    {/* Need to rethink how payment element and totalCard manage state */}
                    <Button
                        id="payment-btn-disabled"
                        disabled
                        variant="primary"
                        size="lg"
                        className="icon-button w-100">
                        <span>Complete Purchase</span>
                    </Button>
                </div>

                {hasError && (
                    <Error />
                )}
            </Card.Footer>
        </Card >
    );
}
