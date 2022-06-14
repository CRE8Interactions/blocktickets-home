import { Route, Routes } from 'react-router-dom';
import { Orders, Sales, Home, EventsPage } from './pages';
import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="events" element={<EventsPage />} />
			<Route path="orders" element={<Orders />} />
			<Route path="sales" element={<Sales />} />
		</Routes>
	);
};

export default Router;
