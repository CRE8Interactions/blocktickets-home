import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import { SearchItem } from './SearchItem';

export default function SearchList({ queryResults }) {
	return (
		<>
			<span className="d-block caption--uppercase-label">Events</span>
			<Stack as="ul" gap={3}>
				{ queryResults && queryResults.map((result, index) => {
					return (
						<li key={index}>
							<SearchItem data={result} />
						</li>
					)
				})}
			</Stack>
		</>
	);
}
