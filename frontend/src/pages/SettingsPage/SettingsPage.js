import React from 'react';
import { Outlet } from 'react-router-dom';

export default function SettingsPage() {
	return (
		<section className="spacer-xs">
			<Outlet />
		</section>
	);
}
