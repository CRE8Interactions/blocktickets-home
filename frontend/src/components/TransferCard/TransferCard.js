import React, { useState, Fragment } from 'react';
import * as moment from 'moment';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function TransferCard({transfer, cancel, status, acceptTransfer}) {
  return (
    <Fragment>
			<Card body className="ticket-card card-md">
      <Card.Img
					src={transfer?.event?.image?.url}
					width="217"
					height="217"
					className="event-image-lg mb-3"
				/>
        <div className="details d-flex-column">
          <Card.Title as="h5">{transfer?.event?.name}</Card.Title>
          <p className="event-details">
						{moment(transfer?.event?.start).format('MMM DD')} <span>{moment(transfer?.event?.start).format('h:mm A')} </span><span className="venue">{transfer?.event?.venue?.name}</span> <span className="loc">
						</span>
					</p>
          <span className="num-tickets">{transfer?.tickets.length} {status ? 'Pending' : ''} {transfer?.tickets.length > 1 ? 'Tickets' : 'Ticket'}</span>
						{
							!status && transfer?.status !== 'claimed' &&
							<Button
								variant="outline-light"
								onClick={() => cancel('cancel', transfer)}
								className="text-danger"
								size="lg">
								Cancel transfer
							</Button>
						}
						{
							status && status === 'userAccepting' &&
							<Button
								variant="outline-light"
								onClick={(e) => acceptTransfer(transfer)}
								className="text-primary"
								size="lg">
								Accept transfer
							</Button>
						}
        </div>
      </Card>
    </Fragment>
  )
}