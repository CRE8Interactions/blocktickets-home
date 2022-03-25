import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, DashboardPage, TicketsPage, CheckoutPage } from './pages';
import { RequireAuth } from './context/Authorization/useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />{' '}
			<Route path="/login" element={<LoginPage />} />{' '}
			<Route
				path="/dashboard"
				element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				}
			/>{' '}
			<Route path="/tickets/:id" element={<TicketsPage />} />
			<Route path="/checkout/:id" element={<CheckoutPage />} /> {/* Add a NotFound route */}
		</Routes>
	);
};

export default Router;
