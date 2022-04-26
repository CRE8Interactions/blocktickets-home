import React from 'react';

import { SettingsWrapper, BankAccount } from '../../../components';

export default function PaymentInformationPage() {
	return (
		<SettingsWrapper>
			<div className="settings-heading">
				<h1 className="settings-title">Payment Information</h1>
				<h2 className="settings-subtitle">
					The money you make from selling your tickets will be issued to the bank account
					associated with this account
				</h2>
			</div>
			<BankAccount />
		</SettingsWrapper>
	);
}
