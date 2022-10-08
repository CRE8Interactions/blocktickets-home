import React, { Fragment } from 'react';
import moment from 'moment';

import { formatDateTime, getStartDateFormatter, formatAddress } from '../../../utilities/helpers'

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export default function DetailsModal({ order }) {
    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-heading--with-border d-flex d-flex-column pb-2 mb-0 details">
                    <h4 className="modal-body-heading-title mb-2">{order?.event?.name}</h4>
                    {order?.event?.presentedBy && (<span className='presenter-text'>{order?.event?.presentedBy}</span>)}
                    <ul>
                        <li><span>{formatDateTime(moment(order?.event?.start), getStartDateFormatter(order?.event))}</span> {!order?.event?.hide_end_date && (<span>- {formatDateTime(moment(order?.event?.end), 'timeOnly')}</span>)}</li>
                        {!order?.event?.hide_doors_open && (
                            <li>Doors Open at {formatDateTime(moment(order?.event?.doorsOpen), 'timeOnly')}</li>
                        )}
                    </ul>
                </div>
                <ListGroup as="ul" variant="flush">
                    {/* <ListGroup.Item as="li" className="list">
                        <p className="heading">Entry Info</p>
                        <span>GA</span>
                    </ListGroup.Item> */}
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Ticket type</p>
                        <span>{order?.details?.ticket?.name}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Location</p>
                        <ul>
                            <li>{order?.event?.venue?.name}</li>
                            <li>{formatAddress(order?.event?.venue?.address[0])}</li>
                        </ul>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Order Number</p>
                        <span>{order?.orderId}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Purchase Date</p>
                        <span>{formatDateTime(moment(order?.event?.createdAt))}</span>
                    </ListGroup.Item>
                    {/* <ListGroup.Item as="li" className="list">
                        <p className="heading">Contact Address</p>
                        <span className="text-secondary">Oxa7d8…..d270</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Token ID</p>
                        <span className="text-secondary">23000121</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Token Standard</p>
                        <span className="text-secondary">ERC - 721</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Blockchain</p>
                        <span className="text-secondary">Ethereum</span>
                    </ListGroup.Item> */}
                </ListGroup>
            </Modal.Body>
        </Fragment>
    );
}
