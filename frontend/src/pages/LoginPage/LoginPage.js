import React, { useLayoutEffect } from 'react';

import { toggleNavContent } from '../../utilities/helpers';

import { LoginSignupForm } from '../../components';

function LoginPage() {
	let show = true;

	useLayoutEffect(() => {
		const btns = document.querySelector('.desktop-btns');
		const nav = document.querySelector('.navbar-nav');

		toggleNavContent(!show, btns, nav);

		return () => {
			toggleNavContent(show, btns, nav);
		};
	}, []);

	return <LoginSignupForm />;
}

export default LoginPage;
