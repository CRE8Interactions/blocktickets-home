import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import { SearchItem } from './SearchItem';

import './searchList.scss';

export default function SearchList({ queryResults }) {
	return (
		<>
			<span className="caption--uppercase-label">Events</span>
			<Stack id="search-list" as="ul" gap={3}>
				{ queryResults && queryResults.map((result, index) => {
					return (
						
							<SearchItem key={index} data={result} />
					)
				})}	
			</Stack>
		</>
	);
}
