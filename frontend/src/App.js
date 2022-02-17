import React, { useEffect } from 'react';
import Router from './Router';
import UserContext from './context/User/user';
import AuthService from './services/auth.service';

function App() {
	const user = AuthService.getUser()

	return (
		<div className="container">
			<UserContext.Provider value={user}>
				<Router />
			</UserContext.Provider>
		</div>
	);
}

export default App;
