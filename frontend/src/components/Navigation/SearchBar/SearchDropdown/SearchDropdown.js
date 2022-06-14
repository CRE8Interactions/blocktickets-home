import React from 'react';

import { SearchResultsContainer } from '../SearchResultsContainer';

import './searchDropdown.scss';

export default function SearchDropdown({ query, queryResults }) {
	return (
		<div id="search-dropdown">
			<SearchResultsContainer query={query} queryResults={queryResults} />
		</div>
	);
}
