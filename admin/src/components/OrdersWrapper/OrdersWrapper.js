import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../utilities/api';

import AuthService from '../../utilities/services/auth.service';
import { checkPermission, formatCurrency, formatNumber } from "./../../utilities/helpers";

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';

import { SearchBar } from '../SearchBar';
import { ExportBtn } from "../ExportBtn";
import { OrderSummary } from '../OrderSummary';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function OrdersWrapper({ eventId }) {

    const { getPermissions } = AuthService;

    const [hasPagePermission, setHasPagePermission] = useState();

    const [hasRefundPermission, setHasRefundPermission] = useState();

    const [details, setDetails] = useState({
        grossSales: 0,
        attendeesCount: 0,
        count: 0,
        orders: []
    })

    useEffect(() => {
        setHasPagePermission(checkPermission(getPermissions(), 3));

        setHasRefundPermission(checkPermission(getPermissions(), 4));

    }, [])

    useEffect(() => {
        getOrders(eventId)
            .then((res) => { setDetails(res.data) })
            .catch((err) => console.error(err))
    }, [eventId]);

    const ordersViewOpt = [
        {
            label: "All orders",
            value: 'all'
        },
        {
            label: "Primary orders",
            value: 'primary'
        },
        {
            label: "Secondary orders",
            value: 'secondary'
        },
        {
            label: "Transfers",
            value: 'transfers'
        },
        {
            label: "Refunds",
            value: 'refunds'
        }
    ];

    const [ordersView, setOrdersView] = useState(ordersViewOpt[0].value);

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleSearch = (query) => {
        setQuery(query)
    }

    return (
        <div className='position-relative'>
            <section className={`max-width-wrapper ${!hasPagePermission ? 'overlay' : ''}`}>
                <header className='section-header'>
                    <div className="section-header">
                        <div className="section-heading">
                            <h1>Orders</h1>
                        </div>
                        <p className='section-header-desc'>See all the orders, refunds and transfers for your event, including gross sales with fees</p>
                    </div>
                    <div className="actions-group-flex">
                        <FloatingLabel controlId="orders" label="Orders">
                            <Form.Select value={ordersView} onChange={(e) => setOrdersView(e.target.value)} aria-label="View Orders">
                                {ordersViewOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by Order #, name, phone number or email" />
                        <ExportBtn data={details.orders} />
                    </div>
                    <Stack direction="horizontal" className='mt-4 split-row'>
                        <Stack as="ul" direction="horizontal" className="horizontal-list">
                            <li>
                                Gross sales
                                <span>{formatCurrency(details.grossSales)}</span>
                            </li>
                            <li>
                                Orders
                                <span>{formatNumber(details.count)}</span>
                            </li>
                            <li>
                                Attendees
                                <span>{formatNumber(details.attendeesCount)}</span>
                            </li>
                        </Stack>
                        <Link to="refund/all" className={`btn btn-outline-light ${!hasRefundPermission && 'btn-link-disabled'}`}>Issue multiple refunds</Link>
                    </Stack>
                </header>
                <Stack as="ul" gap={4}>
                    {details.orders && details.orders.map((order, index) => (
                        <OrderSummary key={index} order={order} hasPermission={hasRefundPermission} />
                    ))}
                </Stack>
            </section>

            {!hasPagePermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
