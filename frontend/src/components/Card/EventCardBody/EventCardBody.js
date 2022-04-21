import React, { Fragment, useContext, useEffect, useState } from 'react';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { IconButton } from '../../IconButton';

import './eventCardBody.scss';

export default function EventCardBody({ type = '', event }) {

	return (
		<Fragment>
			<Card.Title as="h5">{ event?.name }</Card.Title>
			<Card.Subtitle as="h6">{ event?.venue?.name }</Card.Subtitle>
			<hr />
			<ul>
				<li>
					<Row>
						<span className="col caption">{moment(event?.start).format('MMM DD h:mmA')}</span>
						<span className="col caption text-end">{ event?.venue?.address[0]?.city }, { event?.venue?.address[0]?.state }</span>
					</Row>
				</li>
			</ul>
			<IconButton
				variant="outline-light"
				styles="text-primary"
				link={`tickets/${event?.id}?type=${type}`}
				btn="tickets--primary">
				Get Tickets
			</IconButton>
		</Fragment>
	);
}
