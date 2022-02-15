import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomePage, LoginPage } from './pages';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
};

export default Router;
