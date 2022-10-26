import { Route, Routes } from 'react-router-dom';
import {
    AboutUsPage
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
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
