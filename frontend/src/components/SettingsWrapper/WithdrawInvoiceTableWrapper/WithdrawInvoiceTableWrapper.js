import React from 'react';

import { SettingsWrapper } from '../../SettingsWrapper';
import { Withdraw } from './Withdraw';
import { InvoiceTable } from './InvoiceTable';

import './withdrawInvoiceTableWrapper.scss';

export default function WithdrawInvoiceTableWrapper() {
	return (
		<>
		<SettingsWrapper>
			<section id="withdraw">
				<div className="settings-heading">
					<h1 className="settings-title">Withdraw</h1>
					<h2 className="settings-subtitle">Withdraw funds from your account</h2>
				</div>
			
			<Withdraw />
			</section>
		</SettingsWrapper>
		<section id="invoices">
				<div id="invoices-heading-container">
					<div className="settings-heading">
							<h1 className="settings-title">Invoices</h1>
							<h2 className="settings-subtitle">View / download your previous invoices and transactions below</h2>
						</div>
				</div>
			<InvoiceTable />
			</section>
		</>
	);
}
