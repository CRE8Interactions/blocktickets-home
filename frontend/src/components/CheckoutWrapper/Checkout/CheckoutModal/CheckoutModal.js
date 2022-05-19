import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { LeaveModal } from './LeaveModal';
import { ReminderModal } from './ReminderModal';
import { TimeoutModal } from './TimeoutModal';
import { CardDeclineModal } from './CardDeclineModal';

import './checkoutModal.scss';

const typeOfModal = (modalType, handleClose, modalError) => {
	switch (modalType) {
		case 'reminder':
			return <ReminderModal handleClose={handleClose} />;

		case 'timeout':
			return <TimeoutModal />;

		case 'leave':
			return <LeaveModal handleClose={handleClose} />;

		case 'declined':
			return <CardDeclineModal handleClose={handleClose} modalError={modalError} />;

		default:
			return;
	}
};

export default function CheckoutModal({ modalType, setModalType, show, setShow, modalError }) {
	const handleClose = () => {
		setShow(false);
		setModalType('');
	};

	return (
		<Modal
			id="checkout-modal"
			animation={false}
			centered
			keyboard={false}
			backdrop="static"
			show={show}>
			{typeOfModal(modalType, handleClose, modalError)}
		</Modal>
	);
}
