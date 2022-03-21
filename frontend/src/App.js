import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Router from './Router';
import UserContext from './context/User/user';
import AuthService from './utilities/services/auth.service';
import { Navigation, Footer } from './components';
import { hideFooter } from './utilities/helper';

function App() {
	const user = AuthService.getUser();
	let location = useLocation();
	const [
		authenticated,
		setAuthenticated
	] = useState(false);

	useEffect(
		() => {
			console.log('app', location);
			// Remove container class for Dashboard view
			if (location.pathname === '/dashboard') {
				document.getElementById('main-container').classList.remove('container')
			} else {
				document.getElementById('main-container').classList.add('container')
			}
			hideFooter(location.pathname);
		},
		[
			location
		]
	);

	return (
		<Fragment>
			<UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
				<Navigation />
				<div className="container" id="main-container">
					<Router />
				</div>
				<Footer />
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
