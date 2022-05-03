import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import moment from 'moment';

import './searchItem.scss';

export default function SearchItem({ data }) {
	return (
		<Link to="" className="search-item">
			<Stack direction="horizontal" gap={3}>
				<img width="48" height="48" className="event-image" src={data.image.url} />
				<Stack className="details-info">
					<p className="details-info-event-name">{data.name}</p>
					<p className="small text-muted">{moment(data.start).format('ddd, MMM D @ h:mmA')} | {data.venue.name}</p>
				</Stack>
			</Stack>
		</Link>
	);
}
