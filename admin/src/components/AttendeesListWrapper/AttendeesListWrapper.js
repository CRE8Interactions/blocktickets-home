import React, { useState } from 'react';

import { formatCurrency, formatNumber } from '../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';

import { ExportSelect } from '../ExportSelect';
import { SearchBar } from '../SearchBar'
import { Attendees } from './Attendees'

import './attendeesListWrapper.scss';

export default function AttendeesListWrapper() {

    const [exportTo, setExportTo] = useState('1')

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
                        <ExportSelect setExportTo={setExportTo} exportTo={exportTo} />
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
                <Attendees />
            </section>
        </>
    );
}
