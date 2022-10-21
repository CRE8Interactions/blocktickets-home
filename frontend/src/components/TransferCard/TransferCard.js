import React, { Fragment } from 'react';
import * as moment from 'moment';

import { formatShortDate, getStartDateFormatter } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Spinner } from "../SpinnerContainer/Spinner"

import placeholder from '../../assets/placeholder.png'

export default function TransferCard({ transfer, cancel, status, acceptTransfer, isAccepting }) {
    return (
        <Fragment>
            <Card body className="ticket-card">
                <Card.Img
                    src={transfer?.event?.image?.url || placeholder}
                    alt={transfer?.event?.name}
                    width="217"
                    height="217"
                    className="event-image-lg mb-3"
                />
                <div className="details d-flex-column">
                    <Card.Title as="h5">{transfer?.event?.name}</Card.Title>
                    <p className="event-details">
                        {formatShortDate(moment(transfer?.event?.start), getStartDateFormatter(transfer?.event))} <span className="venue">{transfer?.event?.venue?.name}</span> <span className="loc">
                        {transfer?.event?.venue?.address[0]?.city}, {transfer?.event?.venue?.address[0]?.state}
                        </span>
                    </p>
                    <span className="num-tickets">{transfer?.tickets.length} {status ? 'Pending' : ''} {transfer?.tickets.length > 1 ? 'Tickets' : 'Ticket'} </span>
                    {
                        !status && transfer?.status !== 'claimed' &&
                        <Button
                            variant="outline-light"
                            onClick={() => cancel('cancel', transfer)}
                            className="text-danger">
                            Cancel transfer
                        </Button>
                    }
                    {
                        status && status === 'userAccepting' &&
                        <Button
                            variant="outline-light"
                            onClick={(e) => acceptTransfer(transfer)}
                            className="icon-button text-primary">
                            {isAccepting ? (
                                <Spinner variant='dark' />
                            ) : (
                                'Accept transfer'
                            )}
                        </Button>
                    }
                </div>
            </Card>
        </Fragment>
    )
}