import {
	Route,
	Routes,
	Navigate
} from 'react-router-dom';
import {
	HomePage,
	LoginPage,
	DashboardPage,
	TicketsPage
} from './pages';
import {
	RequireAuth
} from './context/auth/useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
	return ( <
		Routes >
		<
		Route path = "/"
		element = {
			< HomePage / >
		}
		/> <
		Route path = "/login"
		element = {
			< LoginPage / >
		}
		/> <
		Route path = "/dashboard"
		element = {
			<
			RequireAuth >
			<
			DashboardPage / >
			<
			/RequireAuth>
		}
		/> <
		Route path = "/tickets/:id"
		element = {
			< TicketsPage / >
		}
		/>

		{
			/* default route */ } <
		Route path = "*"
		element = {
			< Navigate to = "/" / >
		}
		/> <
		/Routes>
	);
};

export default Router;