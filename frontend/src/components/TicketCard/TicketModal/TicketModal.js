import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { DetailsModal } from './DetailsModal';
import { TransferModal } from './TransferModal';
import { SellModal } from './SellModal';
import { NFTModal } from './NFTModal';

import './ticketModal.scss';

const typeOfModal = (modalType, handleClose, setTicketStatus) => {
	switch (modalType) {
		case 'details':
			return <DetailsModal />;

		case 'transfer':
			return <TransferModal />;

		case 'nft':
			return <NFTModal handleClose={handleClose} />;

		case 'sell':
			return <SellModal setTicketStatus={setTicketStatus} />;
		default:
			return;
	}
};
export default function TicketModal({ modalType, show, setShow, setTicketStatus }) {
	const handleClose = () => setShow(false);

	return (
		<Modal id="ticket-modal" scrollable centered show={show} onHide={handleClose}>
			{typeOfModal(modalType, handleClose, setTicketStatus)}
		</Modal>
	);
}
