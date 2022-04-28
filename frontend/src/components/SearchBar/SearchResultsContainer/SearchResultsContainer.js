import React from 'react';
import { Link } from 'react-router-dom';

import { SearchList } from '../../SearchList';

export default function SearchResultsContainer({ query }) {
	// api call with limit results
	return (
		<div className="d-flex-column">
			<h1 className="normal--uppercase desktop-only mb-3">Search results for "{query}"</h1>
			<SearchList />
			<Link to={`search?query=${query}`} className="mt-4 btn btn-outline-light">
				See all results
			</Link>
		</div>
	);
}
