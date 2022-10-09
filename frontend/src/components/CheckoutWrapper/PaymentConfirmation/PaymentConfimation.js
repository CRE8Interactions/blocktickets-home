import React, { Fragment } from 'react';

import Col from 'react-bootstrap/Col';

import { OrderSummary } from './OrderSummary';
import { AddOns } from './AddOns';
import { Order } from './Order';

export default function PaymentConfirmation({ addOns }) {
    let order = sessionStorage.getItem('order')
    if (order) order = JSON.parse(order)

    return (
        <Fragment>
            <Col md={7} lg={6}>
                <h1 className="payment-confirmation-heading">Payment successful</h1>

                <section id="order" className="d-flex-column position-relative">
                    <Order order={order} />
                </section>

                {addOns.length > 0 && (
                    <section id="addOns">
                        <AddOns />
                    </section>
                )}
            </Col>
            <Col md={5} id="order-card">
                <OrderSummary order={order} />
            </Col>
        </Fragment>
    );
}
