import React, { Fragment } from 'react';
import moment from 'moment';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export default function DetailsModal({ order }) {
    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title as="h4">Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-heading--with-border pb-2 mb-0">
                    <h4 className="modal-body-heading-title mb-2">{order?.event?.name}</h4>
                    <p>{moment(order?.event?.start).format('ddd MMM D, YYYY h A')}</p>
                </div>
                <ListGroup as="ul" variant="flush">
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Entry Info</p>
                        <span>GA</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Seat Location</p>
                        <span>GA</span>
                    </ListGroup.Item>

                    <ListGroup.Item as="li" className="list">
                        <ul>
                            <li>
                                <p className="heading">Ticket Info</p>
                                <ul>
                                    {order?.event?.presentedBy &&
                                        <li>{order?.event?.presentedBy}</li>
                                    }
                                    <li>{order?.event?.name}</li>
                                    <li>Doors Open at {moment(order?.event?.doorsOpen).format('h:mm A')}</li>
                                    <li>{moment(order?.event?.start).format('ddd MMM D YYYY h:mm A')}</li>
                                </ul>
                            </li>
                        </ul>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Location</p>
                        <span>{order?.event?.venue?.name} {order?.event?.venue?.address[0]?.city} {order?.event?.venue?.address[0]?.state} {order?.event?.venue?.address[0]?.country}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Order Number</p>
                        <span>{order?.orderId}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
                        <p className="heading">Purchase Date</p>
                        <span>{moment(order?.createdAt).format('ddd, MMM D YYYY - h:mmA')}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="list">
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
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Fragment>
    );
}
