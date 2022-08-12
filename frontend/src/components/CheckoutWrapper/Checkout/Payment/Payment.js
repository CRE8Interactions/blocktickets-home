import React, { Fragment } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

import Form from 'react-bootstrap/Form';

import './payment.scss';

export default function Payment({ checkValid }) {
    const CheckoutForm = () => {
        return (
            <Form id="checkout-form">
                <PaymentElement onChange={(e) => checkValid(e)} />
            </Form>
        );
    };

    return (
        <Fragment>
            <h1 className="section-title mb-3">Payment</h1>
            <h2 className="text-muted small fw-medium">Please select a payment method</h2>
            <CheckoutForm />
        </Fragment>
    );
}
