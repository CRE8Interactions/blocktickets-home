import React from 'react';

import { SettingsWrapper, PersonalDetailsForm } from '../../../components';

export default function PersonalDetailsPage() {
	return (
		<SettingsWrapper>
			<div className="settings-heading">
				<h1 className="settings-title">Personal Details</h1>
				<h2 className="settings-subtitle">Access and change your personal details</h2>
			</div>
			<PersonalDetailsForm />
		</SettingsWrapper>
	);
}
