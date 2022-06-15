import { Route, Routes } from 'react-router-dom';
import { Orders, Sales, HomePage, EventsPage, CreateEventPage } from './pages';
import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="create" element={<CreateEventPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales" element={<Sales />} />
        </Routes>
    );
};

export default Router;
