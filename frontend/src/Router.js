import { Route, Routes } from 'react-router-dom';
import {
	HomePage,
	LoginPage,
	TicketsPage,
	CheckoutPage,
	VenuePage,
	UpcomingEventsPage,
	OrderPage,
	CollectablesPage,
	SettingsPage,
	SettingsOptionsPage,
	PersonalDetailsPage,
	LoginSecurityPage,
	PaymentInformationPage
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
				<Route path="upcoming-events" element={<UpcomingEventsPage />} />
				<Route path="order/:id" element={<OrderPage />} />
				<Route path="collectables" element={<CollectablesPage />} />
				<Route path="settings" element={<SettingsPage />}>
					<Route index element={<SettingsOptionsPage />} />
					<Route path="personal-details" element={<PersonalDetailsPage />} />
					<Route path="login-security" element={<LoginSecurityPage />} />
					<Route path="payment-information" element={<PaymentInformationPage />} />
				</Route>
				{/* Add a NotFound route */}
			</Routes>
		</ScrollToTop>
	);
};

export default Router;
