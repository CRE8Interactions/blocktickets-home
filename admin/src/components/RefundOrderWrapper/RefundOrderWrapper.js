import React, { useState, useEffect } from 'react';

import { getOrders } from '../../utilities/api';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { OrderSummary } from '../OrderSummary';
import { RefundModal } from '../RefundModal';
import { BackButton } from "../BackButton";

export default function RefundOrderWrapper({ orderId, eventId }) {

    const [show, setShow] = useState(false);

    const [order, setOrder] = useState()

    // get specific order
    useEffect(() => {
        getOrders(eventId)
            .then((res) => { setOrder(...res.data.orders.filter(order => order.uuid === orderId)) })
            .catch((err) => console.error(err))
    }, [eventId]);

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    return (
        <>
            <section className='max-width-wrapper'>
                <header className='section-header'>
                    <div className="section-heading">
                        <h1>Refund order</h1>
                    </div>
                    <p className='section-header-desc'>Issue an attendee a refund for their original ticket price</p>
                </header>
                <Stack as="ul" gap={4}>
                    <OrderSummary order={order} showDropdown={false} isOpen={true} />
                </Stack>
                <Stack direction='horizontal' className='btn-group-flex'>
                    <BackButton />
                    <Button size="lg" onClick={handleShow}>Refund</Button>
                </Stack>
            </section>

            <RefundModal show={show} handleClose={handleClose} />
        </>
    );
}
