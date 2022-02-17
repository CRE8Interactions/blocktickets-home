import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, DashboardPage } from './pages';
import { RequireAuth } from './useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/dashboard"
				element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default Router;
