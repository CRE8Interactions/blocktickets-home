import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { SearchWrapper } from '../../components';

export default function SearchPage() {
	// get query from URL
	const { search } = useLocation();

	let param = new URLSearchParams(search, [
		search
	]);

	const [
		query,
		setQuery
	] = useState(param.get('query'));

	useEffect(
		() => {
			setQuery(param.get('query'));
		},
		[
			search
		]
	);

	return (
		<section className="spacer-xs">
			<SearchWrapper query={query} />
		</section>
	);
}
