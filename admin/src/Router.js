import { Route, Routes } from 'react-router-dom';
import { HomePage, EventsPage, CreateEventPage } from './pages';
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
            <Route path="create/:id" element={<CreateEventPage />} />
        </Routes>
    );
};

export default Router;
