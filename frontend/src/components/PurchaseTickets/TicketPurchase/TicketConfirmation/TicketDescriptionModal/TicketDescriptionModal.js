import React from 'react';

import Modal from 'react-bootstrap/Modal';

import './ticketDescriptionModal.scss';

export default function TicketDescriptionModal({ show, handleClose, name, description }) {
    return (
        <Modal id="ticket-description" scrollable centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton className='mb-0'>
                <Modal.Title as="h4">{name}</Modal.Title>
            </Modal.Header>
            <div className="title mb-3">
                <h1 className="m-0 fs-md">Description</h1>
            </div>
            <Modal.Body>
                <p>Important Message Regarding COVID-19
                    Due to the uncertainty related to COVID-19, the holder of this ticket, on behalf of the holder and any accompanying minor, including a minor holding a separate ticket, acknowledges and agrees that admission to the Arena is subject to all safety and health requirements and policies, as well as any additional terms and conditions established by the Arena. Such terms may be updated from time to time (in the sole determination of the Arena). Please continue to visit the FTX Arena website for the most up to date information on the Arena health and safety measures.
                    FTX Arena Official Website
                </p>
                <p>Please continue to visit the FTX Arena website for the most up to date information on the Arena health and safety measures.
                    FTX Arena Official Website</p>
            </Modal.Body>
        </Modal>
    );
}
