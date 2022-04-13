import { Route, Routes, Navigate } from 'react-router-dom';
import {
	HomePage,
	LoginPage,
	DashboardPage,
	UpcomingEventsPage,
	CollectablesPage,
	TicketsPage,
	CheckoutPage,
	VenuePage,
	OrganizationsPage,
	SalesPage,
	EventsPage
} from './pages';
import { ScrollToTop } from './components';
import { RequireAuth } from './context/Authorization/useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<ScrollToTop>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="upcoming-events" element={<UpcomingEventsPage />} />
				<Route path="collectables" element={<CollectablesPage />} />
				<Route
					path="dashboard"
					element={
						<RequireAuth>
							<DashboardPage />
						</RequireAuth>
					}>
					<Route path="organizations" element={<OrganizationsPage />} />
					<Route path="sales" element={<SalesPage />} />
					<Route path="events" element={<EventsPage />} />
				</Route>
				<Route path="tickets/:id" element={<TicketsPage />} />
				<Route
					path="checkout/:id"
					element={
						<RequireAuth>
							<CheckoutPage />
						</RequireAuth>
					}
				/>
				<Route path="venue/:id" element={<VenuePage />} />
				{/* Add a NotFound route */}
			</Routes>
		</ScrollToTop>
	);
};

export default Router;
