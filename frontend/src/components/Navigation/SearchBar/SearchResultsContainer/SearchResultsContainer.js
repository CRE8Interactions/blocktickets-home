import React from 'react';
import { Link } from 'react-router-dom';

import { SearchList } from '../../../SearchList';

export default function SearchResultsContainer({ query, queryResults }) {
	// api call with limit results
	return (
		<div className="d-flex-column">
			<h1 className="normal--uppercase mb-4">Search results for "{query}"</h1>
			<SearchList queryResults={queryResults} />
			<Link to={`search?query=${query}`} className="mt-4 btn btn-outline-light">
				See all results
			</Link>
		</div>
	);
}
