import React from 'react';

import { SettingsWrapper, LoginSecurityForm } from '../../../components';

export default function LoginSecurityPage() {
	return (
		<SettingsWrapper>
			<div className="heading">
				<h1 className="fs-md">Login Security</h1>
				<h2 className="subtitle">
					Update the phone number associated with this account, please fill in the
					following fields. Your phone number is requested for security reasons.
				</h2>
				<p className="mt-3 fw-medium">
					Current Phone Number: <span className="text-secondary" />
				</p>
			</div>
			<LoginSecurityForm />
		</SettingsWrapper>
	);
}