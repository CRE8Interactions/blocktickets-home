import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Stack from 'react-bootstrap/Stack';

import './searchItem.scss';

export default function SearchItem({ data }) {
	return (
		<li className="search-item">
			<Link to={`/tickets/${data.id}?type=genAdmission`} className="d-flex gap-3">
				<img width="48" height="48" className="event-image" src={data.image.url} />
				<Stack className="details-info">
					<p className="details-info-event-name">{data.name}</p>
					<p className="small text-muted">
						{moment(data.start).format('ddd, MMM D @ h:mmA')} | {data.venue.name}
					</p>
				</Stack>
			</Link>
		</li>
	);
}
