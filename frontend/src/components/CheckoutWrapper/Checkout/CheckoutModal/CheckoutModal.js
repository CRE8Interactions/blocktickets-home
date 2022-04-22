import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { LeaveModal } from './LeaveModal';
import { ReminderModal } from './ReminderModal';
import { TimeoutModal } from './TimeoutModal';

import './checkoutModal.scss';

const typeOfModal = (modalType, handleClose) => {
	switch (modalType) {
		case 'reminder':
			return <ReminderModal handleClose={handleClose} />;

		case 'timeout':
			return <TimeoutModal handleClose={handleClose} />;

		case 'leave':
			return <LeaveModal handleClose={handleClose} />;

		default:
			return;
	}
};

export default function CheckoutModal({ modalType, setModalType, show, setShow }) {
	const handleClose = () => {
		setShow(false);
		setModalType('');
	};

	return (
		<Modal id="checkout-modal" centered keyboard={false} backdrop="static" show={show}>
			{typeOfModal(modalType, handleClose)}
		</Modal>
	);
}
