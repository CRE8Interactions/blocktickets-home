import React, { Fragment, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import { SearchItem } from './SearchItem';

export default function SearchList() {
	return (
		<>
			<span className="d-block caption--uppercase-label">Events</span>
			<Stack as="ul" gap={3}>
				{[
					...Array(7)
				].map((el) => <li key={el}>
					<SearchItem data={el} />
				</li>)}
			</Stack>
		</>
	);
}
