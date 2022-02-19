import React, { Fragment, useEffect } from 'react';
import Router from './Router';
import UserContext from './context/User/user';
import AuthService from './utilities/services/auth.service';
import Navigation from './components/Navigation/Navigation';

function App() {
	const user = AuthService.getUser();

	return (
		<Fragment>
			<UserContext.Provider value={user}>
				<Navigation />
				<div className="container">
					<Router />
				</div>
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
