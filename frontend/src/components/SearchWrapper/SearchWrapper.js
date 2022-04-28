import React from 'react';

import Button from 'react-bootstrap/Button';

import { SearchList } from '../SearchList';

export default function SearchWrapper({ query }) {
	// api is called with limited results

	return (
		<>
			<h1 className="fs-md mb-5">We found 128 results for "{query}"</h1>
			<SearchList />
			<Button variant="outline-light" className="mt-4">
				Load more
			</Button>
		</>
	);
}
