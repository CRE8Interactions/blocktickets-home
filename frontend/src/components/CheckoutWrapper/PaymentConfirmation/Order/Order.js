import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';

import { OrderCard } from './OrderCard';

import './order.scss';

export default function Order({ order }) {
    return (
        <Fragment>
            <h1 className="section-title section-title--muted">Order</h1>

            <Stack gap={4} as="ul" className="mt-md-3">
                {order &&
                    <li className="order">
                        <OrderCard order={order} />
                    </li>
                }
            </Stack>
            <Link to="/my-events" className="btn btn-primary" id="myEventsBtn">
                Go to My events
            </Link>
        </Fragment>
    );
}
