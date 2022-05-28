import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { SearchList } from '../SearchList';
import { searchEvents } from '../../utilities/api';

export default function SearchWrapper({ query }) {
	// api is called with limited results
	const [results, setResults] = useState()
	useEffect(() => {
		let data = {
			data: query
		};
		searchEvents(data)
			.then(res => setResults(res.data))
			.catch(err => console.error(err))
	}, [query])

	return (
		<>
			<h1 className="fs-md mb-5">We found {results?.length} results for "{query}"</h1>
			<SearchList queryResults={results} />
			<Button variant="outline-light" className="mt-4">
				Load more
			</Button>
		</>
	);
}
