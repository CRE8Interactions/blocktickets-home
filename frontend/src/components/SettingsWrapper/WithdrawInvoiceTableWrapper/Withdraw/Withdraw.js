import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { InfoIcon } from '../../../InfoIcon';
import { LinkBankAccountBtn } from '../../LinkBankAccountBtn';

import './withdraw.scss';

export default function Withdraw({ details }) {
	// demo purposes, comes from database
	const hasBankAccount = false;

	const [
		totalFunds,
		setTotalFunds
	] = useState(0);

	useEffect(
		() => {
			details &&
				details.map((detail) => {
					setTotalFunds((prevState) => (prevState += detail.total));
				});
		},
		[
			details
		]
	);

	return (
		<Stack gap={4}>
			<Card body className="withdraw-card card-md card--dark">
				<Card.Title as="h5">Available Funds</Card.Title>
				<span className="total">${parseFloat(totalFunds).toFixed(2)}</span>
				{hasBankAccount ? <Button onClick={setTotalFunds(0)}>Withdraw Funds</Button> : <LinkBankAccountBtn />}
			</Card>
			<Card body className="withdraw-card card-md card--light">
				<Stack direction="horizontal" className="heading--flex mb-2">
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
				</Stack>
				<span className="total">${parseFloat(totalFunds).toFixed(2)}</span>
			</Card>
		</Stack>
	);
}
