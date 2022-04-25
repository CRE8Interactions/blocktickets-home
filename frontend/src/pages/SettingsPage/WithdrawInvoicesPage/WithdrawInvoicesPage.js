import React from 'react';

import { SettingsWrapper, Withdraw, InvoiceTable } from '../../../components';

export default function WithdrawInvoicesPage() {
	return (
		<SettingsWrapper>
			<div className="heading">
				<h1 className="page-title">Withdraw</h1>
				<h2 className="subtitle">Withdraw funds from your account</h2>
			</div>
			<Withdraw />
			<InvoiceTable />
		</SettingsWrapper>
	);
}
