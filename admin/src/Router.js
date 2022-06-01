import { Route, Routes } from 'react-router-dom';
import App from './App';
import Orders from './pages/Orders/Orders';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Events from './pages/Events/Events';
import Sales from './pages/Sales/Sales';
import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
	<Routes>
		<Route path="/" element={<App />} />
		<Route path="events" element={<Events />} />
		<Route path="home" element={<Home />} />
		<Route path="orders" element={<Orders />} />
		<Route path="sales" element={<Sales />} />
	</Routes>;
};

export default Router;
