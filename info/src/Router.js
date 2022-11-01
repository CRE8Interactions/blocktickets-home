import { Route, Routes } from 'react-router-dom';
import {
    AboutUsPage,
    TeamPage,
    SellPage
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
                <Route path="/sell" element={<SellPage />} />
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
