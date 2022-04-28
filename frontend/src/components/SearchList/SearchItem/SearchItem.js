import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';

import './searchItem.scss';

export default function SearchItem({ data }) {
	return (
		<Link to="" className="search-item">
			<Stack direction="horizontal" gap={3}>
				<img width="48" height="48" className="event-image" />
				<Stack className="details-info">
					<p className="details-info-event-name">Justice Tour long long long</p>
					<p className="small text-muted">Fri, Jun 7 @ 7:30pm | Scotiabank Arena</p>
				</Stack>
			</Stack>
		</Link>
	);
}
