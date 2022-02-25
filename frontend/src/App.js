import React, { Fragment, useEffect, useState } from 'react';
import Router from './Router';
import UserContext from './context/User/user';
import AuthService from './utilities/services/auth.service';
import { Navigation, Footer } from './components';

function App() {
	const user = AuthService.getUser();
	const [
		authenticated,
		setAuthenticated
	] = useState(false);

	return (
		<Fragment>
			<UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
				<Navigation />
				<div className="container">
					<Router />
				</div>
				<Footer />
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
