import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../User/user';
import authService from '../../utilities/services/auth.service';

const authContext = React.createContext();

export function RequireAuth({ children }) {
	const authed = authService.isLoggedIn();
	const user = useContext(UserContext);

	return authed === true ? children : <Navigate to="/login" replace />;
}