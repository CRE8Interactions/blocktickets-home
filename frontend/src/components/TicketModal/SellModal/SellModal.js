import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '../../../utilities/hooks';
import { toggleElement } from '../../../utilities/helpers';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BackButton } from '../../BackButton';
import { DisplayTickets } from '../DisplayTickets';
import { Numpad } from './Numpad';
import { SuccessContainer } from '../SuccessContainer';

import { SuccessDisclaimer } from '../SuccessDisclaimer';

import { createListing, updateMyListings } from '../../../utilities/api';

export default function SellModal({ handleClose, setTicketStatus, ticketAction, order, listing, getListings }) {

    const windowSize = useWindowSize();

    // 1 - sell 
    // 2 - price 
    // 3 - summary 
    // 4 - success 
    const [
        step,
        setStep
    ] = useState(1);

    const [
        isUpdate,
        setIsUpdate
    ] = useState(false);

    const [label, setLabel] = useState('Price per ticket')

    const [price, setPrice] = useState(0);

    const [priceValid, setPriceValid] = useState(price > 0 && (price > 1000 || price < 2000))

    // selected tickets
    const [
        selectedTickets,
        setSelectedTickets
    ] = useState([]);

    useEffect(() => {
        if (price > 0 && (price < (ticketsTotalPrice / selectedTickets.length) || price > (ticketsTotalPrice / selectedTickets.length) * 100)) {
            setLabel(`Enter amount between $${ticketsTotalPrice / selectedTickets.length} - ${(ticketsTotalPrice / selectedTickets.length) * 100}`);
            setPriceValid(false)
        } else {
            setLabel("Price per ticket")
            setPriceValid(true)
        }

    }, [price])

    useLayoutEffect(() => {
        let el = document.querySelector('.btn-close');

        if (el) {
            if (step === 4)
                toggleElement(el, false)

            return () => {
                toggleElement(el, true)
            }
        };
    }, [step])

    useEffect(() => {
        if (ticketAction === 'edit') {
            setIsUpdate(true)
            setStep(2)
            setPrice(listing.askingPrice)
            setSelectedTickets(listing.tickets)
        }
    }, [])

    const handleGoBack = () => {
        setStep(step - 1)
    }

    const handleClick = () => {
        handleClose();
        if (!isUpdate && step === 4) setTicketStatus('listed')
    };

    const ticketsTotalPrice = selectedTickets.map((ticket) => ticket.cost).reduce((a, v) => a + v, 0);
    const ticketPrice = ticketsTotalPrice / selectedTickets.length

    const submit = () => {
        let data = {
            tickets: selectedTickets,
            quantity: selectedTickets.length,
            askingPrice: price,
            event: order?.event,
            serviceFees: (parseFloat(selectedTickets[0]?.fee).toFixed(2) * selectedTickets?.length).toFixed(2),
            payout: ((parseFloat(price).toFixed(2) * selectedTickets?.length) - (parseFloat(selectedTickets[0]?.fee).toFixed(2) * selectedTickets?.length)).toFixed(2),
            fromOrder: order?.id
        }

        if (ticketAction === 'edit') {
            data.event = listing.event
            updateMyListings(listing.id, data)
                .then((res) => {
                    if (getListings) {
                        getListings()
                    }
                    setStep(4)
                })
                .catch((err) => console.error(err))
        } else {
            createListing(data)
                .then((res) => setStep(4))
                .catch((err) => console.error(err))
        }
    }

    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h5"> {isUpdate ? 'Edit' : 'Sell'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <>
                        <DisplayTickets status="sell" role="select" setSelectedTickets={setSelectedTickets} tickets={order?.tickets} />
                        <Stack direction="horizontal" className="btn-group-flex">
                            <Button onClick={() => setStep(2)} disabled={selectedTickets.length === 0} className="btn-next" size="lg">
                                Set price
                            </Button>
                        </Stack>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="modal-body-heading">
                            <h4 className="modal-body-heading-title mb-2">Price your tickets</h4>
                            <p className="small text-muted fw-medium">
                                Ticket face value ${ticketPrice}
                            </p>
                        </div>
                        <Form.Group controlId='price' className="form-card form-card-lg bg-info">
                            <Form.Label className={!priceValid ? 'text-danger' : ''}>{label}</Form.Label>
                            <Form.Control readOnly={windowSize < 768}
                                type="text" value={`$${price}`} maxLength="7" onChange={(e) => setPrice(e.target.value.substring(1).trim())} required
                            />
                        </Form.Group>
                        {windowSize < 768 && (
                            <Numpad price={price} setPrice={setPrice} />
                        )}
                        <Stack direction="horizontal" className="btn-group-flex">
                            {!isUpdate && (<BackButton variant="default" handleGoBack={handleGoBack} />)}
                            <Button onClick={() => setStep(3)} className="btn-next" disabled={price === 0 || !priceValid} size="lg">{!isUpdate ? 'Payout summary' : 'Update price'}</Button>
                        </Stack>
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className="modal-body-heading--with-border">
                            <h4 className="modal-body-heading-title mb-2">Payment Summary</h4>
                            <p>
                                Please go to 'Settings' in your 'Wallet' and make sure your bank account is linked in order to receive funds from ticket sales.
                            </p>
                        </div>

                        <div>
                            <h2 className="normal text-uppercase text-muted mb-3">Ticket Breakdown</h2>
                            <ul>
                                <li className="list">
                                    <p className="heading">Tickets</p>
                                    <ul>
                                        <Stack as="li" direction="horizontal" className="split-row">
                                            <span>Tickets: ${parseFloat(price).toFixed(2)} x {selectedTickets?.length}</span>
                                            <span className='text-end'>${(parseFloat(price).toFixed(2) * selectedTickets?.length).toFixed(2)}</span>
                                        </Stack>
                                    </ul>
                                </li>
                                <li className="list">
                                    <p className="heading">Service Fees</p>
                                    <ul>
                                        <Stack as="li" direction="horizontal" className="split-row">	<span>Service Fees: {parseFloat(selectedTickets[0]?.fee).toFixed(2)} x {selectedTickets?.length}</span>
                                            <span className='text-end'>(-${(parseFloat(selectedTickets[0]?.fee).toFixed(2) * selectedTickets?.length).toFixed(2)})</span>

                                        </Stack>
                                    </ul>
                                </li>
                                <Stack direction='horizontal' as="li" className="split-row list">
                                    <span className="heading m-0">Your Payout</span>
                                    <span className="text-end fw-medium">${((parseFloat(price).toFixed(2) * selectedTickets?.length) - (parseFloat(selectedTickets[0]?.fee).toFixed(2) * selectedTickets?.length)).toFixed(2)}</span>
                                </Stack>
                            </ul>
                        </div>

                        <div className="mt-auto mt-md-4">
                            <small className="disclaimer mb-3">By clicking 'Agree and sell' you are constenting to Blocktickets <a href="">terms and conditions</a>. </small>
                            <Stack direction="horizontal" className="mt-0 btn-group-flex">
                                <BackButton variant="default" handleGoBack={handleGoBack} />
                                <Button onClick={(e) => submit()} className="btn-next" size="lg">Agree and sell</Button></Stack></div>


                    </>
                )}
                {step === 4 && (
                    <>
                        <SuccessContainer>
                            <h4 className="modal-body-heading-title">
                                {isUpdate ? 'Your tickes price has been updated' : 'Your tickets are listed for sale!'}
                            </h4>
                        </SuccessContainer>
                        <p className="small">
                            {isUpdate ? "Your updated price will be in effect within 2 hours on the marketplace. If your tickets are sold before the price is updated you will receive funds based on the original price." : "We will notify you via sms if a purchase is made. While your tickets are listed, you can change the price or delist them from the marketplace in 'My listings' at anytime"}
                        </p>
                        <SuccessDisclaimer />
                        <Stack className="btn-group-flex">
                            {!isUpdate && (<Link to="/my-listings" className="btn btn-lg btn-outline-light">Go to My listings</Link>)}
                            {selectedTickets.length !== order?.tickets?.length && (<Button onClick={handleClick} size='lg'>Close</Button>)}
                        </Stack>
                    </>

                )}</Modal.Body>
        </Fragment>
    );
}
