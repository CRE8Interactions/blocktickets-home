import React, { Fragment, useState } from 'react';

import Button from 'react-bootstrap/Button';

import { BankAccountDetailsModal } from '../BankAccountDetailsModal';

export default function LinkBankAccountBtn({ marginTop }) {
	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	return (
		<Fragment>
			<Button
				onClick={handleShow}
				className={`icon-button btn-add--white ${marginTop && `m-${marginTop}`}`}
				size="lg">
				Link bank account
			</Button>

			<BankAccountDetailsModal show={show} handleClose={handleClose} />
		</Fragment>
	);
}
