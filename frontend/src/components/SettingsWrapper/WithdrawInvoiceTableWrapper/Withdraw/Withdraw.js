import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { InfoIcon } from '../../../InfoIcon';
import { LinkBankAccountBtn } from '../../LinkBankAccountBtn';
import { getBankAccount, getAvailableFunds } from '../../../../utilities/api';

import './withdraw.scss';

export default function Withdraw({ details }) {
	// demo purposes, comes from database
	const hasBankAccount = false;
	const [account, setAccount] = useState();
	const [funds, setAvailableFunds] = useState();

	const [
		totalFunds,
		setTotalFunds
	] = useState(0);

	useEffect(() => {
		getBankAccount().then((res) => {setAccount(res.data)}).catch((err) => console.error(err));
		getAvailableFunds().then((res) => {
			let data = res.data;
			let payouts = data.map(d => d.payout);
			let sum = payouts.reduce((a, b) => a + b, 0);
			setAvailableFunds(sum);
		}).catch((err) => console.error(err))
	}, [])


	return (
		<Stack gap={4}>
			<Card body className="withdraw-card card-md card--dark">
				<Card.Title as="h5">Available Funds</Card.Title>
				<span className="total">${parseFloat(funds).toFixed(2)}</span>
				{account && account.hasOwnProperty('id') ? <Button>Withdraw Funds</Button> : <LinkBankAccountBtn />}
			</Card>
			<Card body className="withdraw-card card-md card--light">
				<div className="heading--flex mb-2" direction="horizontal">
					<Card.Title as="h5" className="flex-grow-1">
						Funds On Hold
					</Card.Title>
					<OverlayTrigger
						placement="bottom"
						overlay={<Tooltip>Your funds will be released in 5 - 7 business days</Tooltip>}>
						<Button variant="link">
							<InfoIcon />
						</Button>
					</OverlayTrigger>
				</div>
				<span className="total">${parseFloat(totalFunds).toFixed(2)}</span>
			</Card>
		</Stack>
	);
}
