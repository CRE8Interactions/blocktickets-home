import { Route, Routes } from 'react-router-dom';
import {
    AboutUsPage,
    TeamPage
} from './pages';
import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<AboutUsPage />} />
                <Route path="/team" element={<TeamPage />} />
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
