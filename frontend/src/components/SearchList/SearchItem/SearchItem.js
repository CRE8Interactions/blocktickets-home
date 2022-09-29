import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { formatShortDate, formatDateTime } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';

import './searchItem.scss';

export default function SearchItem({ data }) {
    return (
        <li className="search-item">
            <Link to={`/tickets/${data.id}`} className="d-flex gap-3">
                <img
                    width="48"
                    height="48"
                    className="event-image thumbnail"
                    src={data.image.url}
                />
                <Stack className="details-info">
                    <p className="details-info-event-name">{data.name}</p>
                    <span className="small text-muted">
                        {formatShortDate(moment(data.start), 'dateOnlyWithDay')} {data.display_start_time && (<span> @ {formatDateTime(moment(data.start), 'timeOnly')} </span>)} | {data.venue.name}
                    </span>
                </Stack>
            </Link>
        </li>
    );
}
