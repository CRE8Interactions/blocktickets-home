import React, { useState } from 'react';

import { formatCurrency, formatNumber } from '../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

import { ExportSelect } from '../ExportSelect';
import { SearchBar } from '../SearchBar'
import { TicketRow } from './TicketRow'

import './attendeesListWrapper.scss';

export default function AttendeesListWrapper() {

    // search query
    const [
        query,
        setQuery
    ] = useState('');

    const [
        queryResults,
        setQueryResults
    ] = useState('');

    const handleSearch = (query) => { }


    return (
        <>
            <section>
                <header className='section-header' id="attendees-list-header">
                    <div className="section-header" >
                        <div className="section-heading">
                            <h1>Attendees list</h1>
                        </div>
                        <p className='section-header-desc'>View and download a list of your attendees</p>
                    </div>
                    <div className="actions-group-flex">
                        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} size="lg" placeholder="Search by attendee name, email address" />
                        <ExportSelect />
                    </div>
                    <Stack direction="horizontal" className='mt-4 split-row'>
                        <Stack as="ul" direction="horizontal" className="horizontal-list">
                            <li>
                                Gross sales
                                <span>{formatCurrency(10000)}</span>
                            </li>
                            <li>
                                Orders
                                <span>{formatNumber(50)}</span>
                            </li>
                            <li>
                                Attendees
                                <span>{formatNumber(10)}</span>
                            </li>
                        </Stack>
                    </Stack>
                </header>


                <div className="full-width-table table-container">
                    <Table className='table-lg'>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Order date</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Quantity</th>
                                <th>Transaction type</th>
                                <th>Ticket type</th>
                                <th>Market type</th>
                                <th>Paid</th>
                                <th>Service fees</th>
                                <th>Facility fee</th>
                                <th>Payment processing fee</th>
                                <th>Tax</th>
                                <th>Attendee status</th>
                                <th>Payment method</th>
                                <th>Last 4 digits</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip code</th>
                                <th>Gender</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TicketRow />
                            <TicketRow />
                            <TicketRow />
                            <TicketRow />
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
}
