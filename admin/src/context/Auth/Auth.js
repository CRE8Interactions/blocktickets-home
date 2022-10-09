import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserContext from '../User/User';
import authService from '../../utilities/services/auth.service';

const authContext = React.createContext();

export function RequireAuth({ children }) {
	const authed = authService.isLoggedIn();
	const user = useContext(UserContext);
	let location = useLocation();
	// Redirect them to the /login page, but save the current location they were
	// trying to go to when they were redirected. This allows us to send them
	// along to that page after they login, which is a nicer user experience
	// than dropping them off on the home page.
	return authed === true ? children : <Navigate to="/login" state={{ from: location }} replace />;
}