import React, { useState, useEffect, useLayoutEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getPaymentIntent } from '../../utilities/api';

import Row from 'react-bootstrap/Row';

import { toggleNavContent, fullHeightContainer, removeFullHeightContainer, toggleElement } from '../../utilities/helpers';

import { Checkout } from './Checkout';
import { PaymentConfirmation } from './PaymentConfirmation';

import './checkoutWrapper.scss';

export default function CheckoutWrapper() {
    let show = true;
    let cart = sessionStorage.getItem('cart');

    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

    const [
        clientSecret,
        setClientSecret
    ] = useState('');

    const [
        status,
        setStatus
    ] = useState('checkout');

    const [
        intentId,
        setIntentId
    ] = useState('');

    const [
        order,
        setOrder
    ] = useState();

    useLayoutEffect(() => {
        document.getElementById('logo-link').style.pointerEvents = 'none';
        const btns = document.querySelector('.desktop-btns');
        const nav = document.querySelector('.navbar-nav');
        const timer = document.getElementById('timer-container');

        toggleElement(timer, show);
        toggleNavContent(!show, btns, nav);

        const el = document.querySelector('#main-container');

        fullHeightContainer(el);

        return () => {
            toggleElement(timer, !show);
            toggleNavContent(show, btns, nav);
            removeFullHeightContainer(el);
            document.getElementById('logo-link').style.pointerEvents = 'auto';
        };
    }, []);

    useEffect(() => {
        let cart = sessionStorage.getItem('cart');
        if (cart) cart = JSON.parse(cart);

        let data = {
            ticket: cart.ticket,
            listing: cart.listing,
            ticketCount: cart.ticketCount
        };

        getPaymentIntent(data)
            .then((res) => {
                setClientSecret(res.data.client_secret);
                setIntentId(res.data.id);
            })
            .catch((err) => console.error(err));
    }, []);

    const addOns = [];

    const appearance = {
        theme: 'flat',
        variables: {
            fontFamily: ' "Poppins", sans-serif',
            fontLineHeight: '1.4',
            fontSizeBase: '14px',
            fontSizeSm: '12px',
            fontWeightNormal: '500',
            borderRadius: '12px',
            colorPrimary: '#5ab6f8',
            colorBackground: '#fcfcfd',
            colorText: '#23262F',
            colorWarning: '#EF466F',
            colorDanger: '#EF466F',
            colorTextSecondary: '#777e90',
            spacingUnit: '12px',
            spacingGridRow: '24px'
        },
        rules: {
            '.Input': {
                boxShadow: '0px 0px 0px 2px #E6E8EC',
                padding: '12.250px 14.875px',
                lineHeight: 'var(--fontLineHeight)'
            },

            '.Input:focus': {
                outline: '0',
                boxShadow: '0px 0px 0px 2px var(--colorPrimary)'
            },
            '.Input:disabled, .Input--invalid:disabled': {
                color: 'lightgray'
            },
            '.Tab': {
                boxShadow: '0px 0px 0px 2px #E6E8EC',
                padding: '12.250px 14.875px',
                border: 'none'
            },
            '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
                border: 'none',
                boxShadow: '0px 0px 0px 2px var(--colorPrimary)',
                backgroundColor: 'var(--colorPrimary)'
            },
            '.Label': {
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'var(--colorTextSecondary)',
                marginBottom: 'var(--spacingUnit)',
                lineHeight: 'var(--fontLineHeight)'
            },

            '.Input--invalid': {
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)'
            },

            '.Error': {
                marginTop: 'var(--spacingUnit)'
            }
        }
    };

    const options = {
        // passing the client secret obtained from the server
        clientSecret,
        appearance
    };

    if (status === 'successful') {
        const timer = document.getElementById('timer-container');
        const btns = document.querySelector('.desktop-btns');
        const nav = document.querySelector('.navbar-nav');

        toggleNavContent(show, btns, nav);
        toggleElement(timer, !show);
        document.getElementById('logo-link').style.pointerEvents = 'auto';
        document.getElementById('checkout-wrapper').classList.add('confirmation-padding');
    }

    return (
        <div className="full-height-wrapper" id="checkout-wrapper">
            <Row className="justify-content-between">
                {clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        {status === 'checkout' && (
                            <Checkout addOns={addOns} setStatus={setStatus} setOrder={setOrder} intentId={intentId} />
                        )}
                        {status === 'successful' && <PaymentConfirmation addOns={addOns} order={order} />}
                    </Elements>
                )}
            </Row>
        </div>
    );
}
