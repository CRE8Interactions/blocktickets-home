import React, { useEffect, useState } from 'react';

import { SettingsWrapper, BankAccount } from '../../../components';
import { createBankAccount, getBankAccount, removeBankAccount } from '../../../utilities/api';

export default function PaymentInformationPage() {
	const [account, setAccount] = useState('')

	const getAccount = () => {
		getBankAccount().then((res) => setAccount(res.data)).catch((err) => console.error(err));
	}

	const removeBank = () => {
		removeBankAccount().then(setAccount('')).catch(err => console.error(err))
	}

	useEffect(() => {
		getAccount()
	}, [])

	return (
		<SettingsWrapper>
			<div className="settings-heading">
				<h1 className="settings-title">Payment Information</h1>
				<h2 className="settings-subtitle">
					The money you make from selling your tickets will be issued to the bank account associated with this
					account.
				</h2>
			</div>
			<BankAccount account={account} getAccount={getAccount} />
		</SettingsWrapper>
	);
}
