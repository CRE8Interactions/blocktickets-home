import React from 'react';

import { SearchResultsContainer } from '../SearchResultsContainer';

import './searchDropdown.scss';

export default function SearchDropdown({ query }) {
	return (
		<div id="search-dropdown">
			<SearchResultsContainer query={query} />
		</div>
	);
}
