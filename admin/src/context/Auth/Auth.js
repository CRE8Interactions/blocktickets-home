import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../utilities/services/auth.service';


export function RequireAuth({ children }) {
	const authed = authService.isLoggedIn();
	return authed === true ? children : <Navigate to="/login" replace />;
}