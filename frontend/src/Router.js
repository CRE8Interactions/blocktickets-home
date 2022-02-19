import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, DashboardPage } from './pages';
import { RequireAuth } from './context/Auth/useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route
				path="/dashboard"
				element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default Router;
