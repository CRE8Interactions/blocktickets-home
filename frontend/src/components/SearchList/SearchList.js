import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import { SearchItem } from './SearchItem';

import './searchList.scss';

export default function SearchList({ queryResults }) {
    return (
        <>
            <span className="caption--uppercase-label mb-1">Events</span>
            <Stack id="search-list" as="ul">
                {queryResults && queryResults.map((result, index) => {
                    return (
                        <SearchItem key={index} data={result} />
                    )
                })}
            </Stack>
        </>
    );
}
