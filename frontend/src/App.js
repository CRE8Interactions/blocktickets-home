import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Router from './Router';
import UserContext from './context/User/user';
import AuthService from './utilities/services/auth.service';

import { Navigation } from './components';

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
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
