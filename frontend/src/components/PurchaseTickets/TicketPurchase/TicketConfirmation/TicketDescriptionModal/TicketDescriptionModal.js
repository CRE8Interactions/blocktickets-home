import React from 'react';

import Modal from 'react-bootstrap/Modal';

import './ticketDescriptionModal.scss';

export default function TicketDescriptionModal({ show, handleClose, name, ticket }) {
    return (
        <Modal id="ticket-description" scrollable centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton className='mb-0'>
                <Modal.Title as="h4">{name}</Modal.Title>
            </Modal.Header>
            <div className="title mb-3">
                <h1 className="m-0 fs-md">Description</h1>
            </div>
            <Modal.Body>
                <pre>{ticket?.description}</pre>
            </Modal.Body>
        </Modal>
    );
}
