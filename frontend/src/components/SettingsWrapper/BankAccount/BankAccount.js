import React, { Fragment, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { LinkBankAccountBtn } from './../LinkBankAccountBtn';
import { BankAccountDetailsModal } from '../BankAccountDetailsModal';

import './bankAccount.scss';

export default function BankAccount() {
	// demo purposes, will come from database
	const hasBankAccount = false;

	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	return (
		<Fragment>
			{hasBankAccount ? (
				<Card body id="bank-account-card" className="card-md card--light">
					<Card.Title as="h5" className="mb-3">
						Bank Information
					</Card.Title>
					<ul>
						<li>
							<Card.Text>Camerica Bank</Card.Text>
						</li>
						<li>
							<Card.Text>Checking XXXXX6742</Card.Text>
						</li>
						<li>
							<Card.Text>U.S. Dollars, United States</Card.Text>
						</li>
					</ul>
					<Stack direction="horizontal" className="mt-3">
						<Button variant="link" onClick={handleShow}>
							Edit
						</Button>
						<Button variant="link" className="text-danger">
							Delete
						</Button>
					</Stack>
				</Card>
			) : (
				<LinkBankAccountBtn marginTop="0" />
			)}

			<BankAccountDetailsModal show={show} handleClose={handleClose} />
		</Fragment>
	);
}
