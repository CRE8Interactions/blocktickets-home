import React from 'react';

import { SettingsWrapper, PersonalDetailsForm } from '../../../components';

export default function PersonalDetailsPage() {
	return (
		<SettingsWrapper>
			<div className="heading">
				<h1 className="fs-md">Personal Details</h1>
				<h2 className="subtitle">Access and change your personal details</h2>
			</div>
			<PersonalDetailsForm />
		</SettingsWrapper>
	);
}
