import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';

import './ticketModal.scss';

const typeOfModal = (modalType) => {
	switch (modalType) {
		case 'details':
			return <DetailsModal />;

		case 'transfer':
			return <TransferModal />;

		case 'sell':
			return <SellModal />;
		default:
			return;
	}
};
export default function TicketModal({ modalType, show, setShow }) {
	const handleClose = () => setShow(false);

	return (
		<Modal id="ticket-modal" scrollable centered show={show} onHide={handleClose}>
			{typeOfModal(modalType)}
		</Modal>
	);
}
